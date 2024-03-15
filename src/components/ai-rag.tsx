"use client"

import { Send } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

export function ChatAI() {
    return (
        <div
            className="relative max-h-screen "
            id="message-container"
        >

            {/* message list */}
            {/* <MessageList messages={messages} isLoading={isLoading} /> */}

            <form
                // onSubmit={handleSubmit}
                className="sticky bottom-0  py-3 bg-white"
            >
                <div className="flex">
                    <Input
                        // value={input}
                        // onChange={handleInputChange}
                        placeholder="Ask any question..."
                        className="w-full"
                    />
                    <Button className="bg-black ml-2 h-9">
                        <Send className="h-6 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    )
}