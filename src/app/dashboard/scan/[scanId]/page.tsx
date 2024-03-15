// @ts-nocheck
"use client"
import { logColumns } from '@/components/activity/columns';
import { DataTable } from '@/components/activity/data-table';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Icons } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';

type Props = {
    params: {
        scanId: number;
    };
};


type CustomHeaders = {
    'X-Apikey'?: string;
};
const VirusTotalAnalysis: React.FC<Props> = ({ params: { scanId } }: Props) => {
    const API_KEY = process.env.VIRUS_TOTAL_API_KEY;
    const { data, isLoading, isError, isSuccess } = useQuery<any>({
        queryKey: ['virusTotalData', scanId],
        queryFn: async () => {
            try {
                // const response = await fetch(`https://www.virustotal.com/api/v3/analyses/${scanId}`, {
                //     headers: {
                //         'X-Apikey': API_KEY, // Replace with your actual API key
                //     },
                // });
                const headers: CustomHeaders = {
                    'X-Apikey': API_KEY, // Replace with your actual API key
                };

                const response = await fetch(`https://www.virustotal.com/api/v3/analyses/${scanId}`, {
                    headers: headers,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return await response.json();
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data from VirusTotal API</div>;
    }
    const r = data.data.attributes.results;
    const stats = data.data.attributes.stats;
    const total = stats.harmless + stats.malicious + stats.suspicious + stats.undetected;
    if (!r) return <div>no data</div>
    // Map the results object to an array of objects with engine names and categories
    const engineResultsArray = Object.entries(r).map(([engineName, engineData]) => ({
        "virus": engineName,
        "status": engineData.category
    }));
    return (
        <div>
            {isSuccess && data && data.data && (

                <div>
                    <DashboardHeader heading="Analysis" text="Analysis of your links">

                    </DashboardHeader>
                    <div className='py-3 grid gap-5 md:grid-cols-2 lg:grid-cols-5'>
                        <Card className='w-100'>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold"><span className='text-green-500'>{total}</span></div>
                                {/* <p className="text-xs text-muted-foreground">All time</p> */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Malicious</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold"><span className='text-red-500'>{stats.malicious}</span></div>
                                {/* <p className="text-xs text-muted-foreground">All time</p> */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Suspicious</CardTitle>
                            </CardHeader>
                            <CardContent>

                                <div className="text-3xl font-bold"><span className='text-red-500'>{stats.suspicious}</span></div>
                                {/* <p className="text-xs text-muted-foreground">All time</p> */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Undetected</CardTitle>
                            </CardHeader>
                            <CardContent>

                                <div className="text-3xl font-bold"><span className='text-red-500'>{stats.undetected}</span></div>
                                {/* <p className="text-xs text-muted-foreground">All time</p> */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Harmless</CardTitle>
                            </CardHeader>
                            <CardContent>

                                <div className="text-3xl font-bold"><span className='text-green-500'>{stats.harmless}</span></div>
                                {/* <p className="text-xs text-muted-foreground">All time</p> */}
                            </CardContent>
                        </Card>

                    </div>
                    <DashboardHeader text="Security vendors' analysis"></DashboardHeader>
                    <DataTable columns={logColumns} data={engineResultsArray} />
                </div>
            )}
        </div>
    );

};

export default VirusTotalAnalysis;
