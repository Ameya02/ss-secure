from gradio import themes
import requests
import gradio as gr
import random
import time

# Assuming this is the URL of your Flask API
api_url = 'public_url'

with gr.Blocks(theme=gr.themes.Default(),css=".gradio-container {background-color: white}") as demo:
  chatbot = gr.Chatbot(height=800)

  # just to fit the notebook
  msg = gr.Textbox(label="Prompt")
  btn = gr.Button("Submit")
  clear = gr.ClearButton(components=[msg, chatbot], value="Clear console")

  def respond(message, chat_history, max_convo_length=10):
    try:
      # Sending POST request to Flask API
      response = requests.post(api_url, json={'question': message}).json()
      print(f"Received response from API: {response}")

      # Extract the response from the API
      bot_response = response.get('response',
                                  "Sorry, I couldn't understand that.")

      # Display the response in the chat
      chat_history.append((message, bot_response))
      return "", chat_history
    except Exception as e:
      print(f"Error in respond function: {e}")
      return "", chat_history

  btn.click(respond, inputs=[msg, chatbot], outputs=[msg, chatbot])
  msg.submit(respond, inputs=[msg, chatbot],
             outputs=[msg, chatbot])  # Press enter to submit

gr.close_all()
demo.launch(share=True)
