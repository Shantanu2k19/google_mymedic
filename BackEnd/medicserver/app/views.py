from datetime import datetime
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponseRedirect
import logging
from django.contrib import messages

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
from dotenv import load_dotenv
from django.middleware.csrf import get_token
import json


#utility functions
from .utils.file_processing import processFile

#get csrf token
def get_csrf_token(request):
    logging.info("get_csrf_token____")
    username = request.GET.get('username')
    logging.info('user [%s]',username)
    return JsonResponse({'csrfToken': get_token(request)})


#upload image and get data 
@csrf_exempt
def upload_image(request):
    logging.info("upload_image____")
    if request.method == 'POST' and request.FILES.get('file'):
        api_key = request.headers.get('X-APIKEY')
        load_dotenv()
        SECRET_KEY = os.getenv('SECRET_KEY')
        if api_key != SECRET_KEY:
            return JsonResponse({'error': 'Invalid API Key'}, status=401)

        username = request.headers.get('X-USERNAME')
        if not username:
            return JsonResponse({'error': 'Username not found'}, status=401)

        print("request from :"+username)
        
        uploaded_image_file = request.FILES['file']
        ret = {
            "status": 200,
            "mssg": "success",
            "data": {},
            "file_url": ""
        }
        processFile(uploaded_image_file, username, ret)
        print("processing done")

        if(ret["status"]!=200):
            return JsonResponse({'error': ret["mssg"]}, status=ret["status"])

        print("done")

        print(ret['data'])

        print('\n\n\n---------------------\n\n\n')

        try:
            json_data = processJsonText(ret['data'])
        except Exception as e:
            print(f"error: {e}")
            json_data = ret['data']

        print(json_data)
        ret['data'] = json_data
        print(type(json_data))
        return JsonResponse({'message': 'File uploaded successfully', 'ret': ret})
    return JsonResponse({'message': 'No file found'}, status=400)

#index view
def index(request):
    logging.info("index____")
    return render(request, "app/index.html")

def processJsonText(data_string):
    data_string = data_string[7:]
    
    data_string = data_string[:-3]
    
    transformed_string = '{ "medData": ' + data_string + ' }'
    
    return json.loads(transformed_string)


data = """```json
[
  {
    "name": "ISOTROIN 20 MG",
    "use": "Treatment of severe acne",
    "dosage": "1 tablet every alternate day after meal",
    "sideeffects": "Dry skin, itching, nosebleeds, muscle aches, joint pain, elevated liver enzymes, mood changes, depression (rare)",
    "working": "Isotretinoin is a retinoid that reduces the amount of oil produced by glands in the skin. It also shrinks the size of oil glands, reduces inflammation, and helps prevent bacteria from clogging pores.",
    "extraInfo": ""
  },
  {
    "name": "Clindamycin Lotion",
    "use": "Treatment of acne",
    "dosage": "Apply once daily at night",
    "sideeffects": "Dry skin, itching, burning, redness, peeling",
    "working": "Clindamycin is an antibiotic that works by stopping the growth of bacteria that can cause acne.",
    "extraInfo": ""
  },
  {
    "name": "UV Gel SPF 30",
    "use": "Sun protection",
    "dosage": "Apply as needed before sun exposure",
    "sideeffects": "Rarely, allergic reactions (rash, itching, swelling)",
    "working": "Provides broad-spectrum protection against harmful UVA and UVB rays, protecting skin from sunburn and sun damage.",
    "extraInfo": ""
  },
  {
    "name": "FASHX 7 MG Shampoo",
    "use": "Not specified, likely for scalp condition related to acne",
    "dosage": "Apply every alternate day",
    "sideeffects": "Not clear without knowing active ingredients. Could include dryness, itching, irritation.",
    "working": "Mechanism of action depends on the active ingredients. Could be antifungal, anti-inflammatory, or keratolytic.",
    "extraInfo": ""
  },
  {
    "name": "IDERM Lotion",
    "use": "Treatment of various skin conditions, likely moisturizing and soothing for acne-prone skin",
    "dosage": "Apply once daily",
    "sideeffects": "Not clear without knowing active ingredients. Generally well-tolerated; potential for mild irritation.",
    "working": "Depends on the specific formulation. Could contain ingredients to moisturize, soothe, protect, or repair the skin barrier.",
    "extraInfo": ""
  }
],
"extraInfo": {
  "patientName": "Mr zod",
  "patientAge": "8 years 3 months",
  "patientSex": "Male",
  "doctorName": "Dr Arora",
  "doctorSpeciality": "Allergy",
  "provisionalDiagnosis": "Acne",
  "reviewAfter": "14 days" 
}
```"""

def sampleData(request):
    logging.info("sample_____")
    x = processJsonText(data)
    print(x)
    ret = {
            "status": 200,
            "mssg": "success",
            "data": x,
            "file_url": ""
        }
    return JsonResponse({'message': 'File uploaded successfully', 'ret': ret})


# logging.debug("This is a debug message")
# logging.info("This is an info message")
# logging.warning("This is a warning message")
# logging.error("This is an error message")
# logging.critical("This is a critical message")

#custom error handling [TODO: is there better approach?]
# ret = {
#     "status": 200,
#     "mssg": "success",
#     "data": {}
# }