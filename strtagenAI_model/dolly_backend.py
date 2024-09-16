import torch                        # allows Tensor computation with strong GPU acceleration
from transformers import pipeline   # fast way to use pre-trained models for inference
import os

# load model
dolly_pipeline = pipeline(model="databricks/dolly-v2-3b",
                            torch_dtype=torch.bfloat16,
                            trust_remote_code=True,
                            device_map="auto")

# define helper function
def get_completion_dolly(input):
  system = f"""
  You are an marketing lead expertised in promotional marketing.
  You are good at creating promotional startgeies for small FMCG healthy food brands like heathkart , Millet Amma , Jiva Amrut.
  These brands comes to you seeking help regarding their brands promotion , give them promotional startgey.
  """
  prompt = f"#### System: {system}\n#### User: \n{input}\n\n#### Response from Dolly-v2-3b:"
  print(prompt)
  dolly_response = dolly_pipeline(prompt,
                                  max_new_tokens=500
                                  )
  return dolly_response[0]["generated_text"]


# let's prompt
prompt = "Hello there, I'm the marketing manager at Millet Amma, and I'm looking to promote our brand in central India. Millet Amma specializes in providing nutritious and delicious millet-based food products. We focus on promoting healthy eating habits while also catering to the taste preferences of our consumers."
# prompt = "Why is the Sky blue?"

print(get_completion_dolly(prompt))