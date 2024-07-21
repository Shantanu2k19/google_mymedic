-text from gemini validation for json
- add date and name instead of expand collapse in history 
- hangle when backend is not working
- show fetching when history fetchng

    // mobile: default
    // sm:split screne Laptop
    // md: full screnn Laptop
    // lg:
    // sm:text-dark-1 md:text-white lg:text-primary-500 


    gemini
gemini querrying
extraction success, saving file
url is /media/user1_max.j_13_07_2024_14_29_51.jpg
name is user1_max.j_13_07_2024_14_29_51.jpg
processing done
done
```json
{
  "prescriptions": [
    {
      "name": "ISOTROIN 20 MG",
      "use": "Treatment of severe acne",
      "dosage": "1 tablet every alternate day after meal",
      "sideeffects": "Dry skin, cheilitis (dry lips), elevated liver enzymes, mood changes, depression",
      "working": "Isotretinoin is a retinoid that reduces the production of oil in the skin and shrinks the sebaceous glands. It is used for severe, recalcitrant nodular acne."
    },
    {
      "name": "[Unspecified] gel",
      "use": "Likely for acne treatment",
      "dosage": "Once daily at night, wash after 4 hours",
      "sideeffects": "Dependent on the specific gel ingredients",
      "working": "Dependent on the specific gel ingredients. Could be a benzoyl peroxide, retinoid, or antibiotic gel."
    },
    {
      "name": "[Unspecified] spray",
      "use": "Not specified",
      "dosage": "Twice daily",
      "sideeffects": "Dependent on the specific spray ingredients",
      "working": "Dependent on the specific spray ingredients."
    },
    {
      "name": "Clindamycin lotion",
      "use": "Topical antibiotic for acne",
      "dosage": "Once daily at night",
      "sideeffects": "Dry skin, irritation, redness, peeling",
      "working": "Clindamycin is an antibiotic that inhibits bacterial growth on the skin, reducing inflammation associated with acne."
    },
    {
      "name": "Acne UV gel spf 30",
      "use": "Sun protection and likely acne treatment",
      "dosage": "Apply before sun exposure",
      "sideeffects": "Unlikely, but may include mild irritation or allergy in some individuals",
      "working": "Provides broad-spectrum sun protection and may contain ingredients like benzoyl peroxide or salicylic acid to help manage acne."
    },
    {
      "name": "FASHX 7 MG",
      "use": "Not specified, requires clarification from the prescribing doctor",
      "dosage": "Not specified, requires clarification from the prescribing doctor",
      "sideeffects": "Unknown without identifying the medication",
      "working": "Unknown without identifying the medication"
    },
    {
      "name": "Lt AD SHAMPOO",
      "use": "Likely for scalp condition related to acne or seborrheic dermatitis",
      "dosage": "Every alternate day",
      "sideeffects": "Dependent on the specific shampoo ingredients, may include dryness or irritation",
      "working": "Likely contains ingredients like ketoconazole, zinc pyrithione, or selenium sulfide to control fungal growth or reduce inflammation." 
    },
    {
      "name": "IDERM LOTION",
      "use": "Moisturizer, likely for dry skin associated with acne treatment",
      "dosage": "Once daily",
      "sideeffects": "Generally well-tolerated, may cause mild irritation or allergy in some individuals",
      "working": "Provides hydration and strengthens the skin barrier."
    }
  ],
  "extra_info": {
    "provisional_diagnosis": "Acne", 
    "review_after": "14 days",
    "hospital": "Max Super Speciality Hospital",
    "hospital_address": "FE50 C D Block Shalimar Bagh Delhi 110 088" 
  }
}
```



---------------------



error: Expecting property name enclosed in double quotes: line 63 column 41 (char 2959)
```json
{
  "prescriptions": [
    {
      "name": "ISOTROIN 20 MG",
      "use": "Treatment of severe acne",
      "dosage": "1 tablet every alternate day after meal",
      "sideeffects": "Dry skin, cheilitis (dry lips), elevated liver enzymes, mood changes, depression",
      "working": "Isotretinoin is a retinoid that reduces the production of oil in the skin and shrinks the sebaceous glands. It is used for severe, recalcitrant nodular acne."
    },
    {
      "name": "[Unspecified] gel",
      "use": "Likely for acne treatment",
      "dosage": "Once daily at night, wash after 4 hours",
      "sideeffects": "Dependent on the specific gel ingredients",
      "working": "Dependent on the specific gel ingredients. Could be a benzoyl peroxide, retinoid, or antibiotic gel."
    },
    {
      "name": "[Unspecified] spray",
      "use": "Not specified",
      "dosage": "Twice daily",
      "sideeffects": "Dependent on the specific spray ingredients",
      "working": "Dependent on the specific spray ingredients."
    },
    {
      "name": "Clindamycin lotion",
      "use": "Topical antibiotic for acne",
      "dosage": "Once daily at night",
      "sideeffects": "Dry skin, irritation, redness, peeling",
      "working": "Clindamycin is an antibiotic that inhibits bacterial growth on the skin, reducing inflammation associated with acne."
    },
    {
      "name": "Acne UV gel spf 30",
      "use": "Sun protection and likely acne treatment",
      "dosage": "Apply before sun exposure",
      "sideeffects": "Unlikely, but may include mild irritation or allergy in some individuals",
      "working": "Provides broad-spectrum sun protection and may contain ingredients like benzoyl peroxide or salicylic acid to help manage acne."
    },
    {
      "name": "FASHX 7 MG",
      "use": "Not specified, requires clarification from the prescribing doctor",
      "dosage": "Not specified, requires clarification from the prescribing doctor",
      "sideeffects": "Unknown without identifying the medication",
      "working": "Unknown without identifying the medication"
    },
    {
      "name": "Lt AD SHAMPOO",
      "use": "Likely for scalp condition related to acne or seborrheic dermatitis",
      "dosage": "Every alternate day",
      "sideeffects": "Dependent on the specific shampoo ingredients, may include dryness or irritation",
      "working": "Likely contains ingredients like ketoconazole, zinc pyrithione, or selenium sulfide to control fungal growth or reduce inflammation." 
    },
    {
      "name": "IDERM LOTION",
      "use": "Moisturizer, likely for dry skin associated with acne treatment",
      "dosage": "Once daily",
      "sideeffects": "Generally well-tolerated, may cause mild irritation or allergy in some individuals",
      "working": "Provides hydration and strengthens the skin barrier."
    }
  ],
  "extra_info": {
    "patient_age": "3 years 3 months" , // Assuming this is a typo and the patient is older.
    
    "doctor_speciality": "Allergy",
    "provisional_diagnosis": "Acne", 
    "review_after": "14 days",
    "hospital": "Max Super Speciality Hospital",
    "hospital_address": "FE50 C D Block Shalimar Bagh Delhi 110 088" 
  }
}
```




```json
{
  "prescriptions": [
    {
      "name": "ISOTROIN 20 MG",
      "use": "Treats severe acne",
      "dosage": "1 tablet daily after meals",
      "sideeffects": "Dry skin, itching, nosebleeds, muscle aches, joint pain, elevated liver enzymes, mood changes, depression",
      "working": "Isotretinoin is a retinoid, meaning it’s related to vitamin A. It reduces the amount of oil released by oil glands in your skin, and helps your skin renew itself more quickly. This reduces inflammation and the formation of acne."
    },
    {
      "name": "Acne UV gel spf 30",
      "use": "Protects skin from sun damage and helps control acne",
      "dosage": "Apply liberally to exposed skin 15 minutes before sun exposure and reapply every 2 hours.",
      "sideeffects": "Possible mild skin irritation or allergic reactions",
      "working": "Provides broad-spectrum sun protection, preventing UV damage that can worsen acne. May contain additional acne-fighting ingredients."
    },
    {
      "name": "Clindamycin Lotion",
      "use": "Treats acne",
      "dosage": "Apply once daily at night",
      "sideeffects": "Dryness, itching, burning, redness, or peeling of the skin",
      "working": "Clindamycin is an antibiotic. It works by stopping the growth of bacteria that can cause acne." 
    },
    {
      "name": "[Unspecified] gel",
      "use": "Likely for acne treatment",
      "dosage": "Apply once daily at night, wash off after 4 hours",
      "sideeffects": "Unknown (depends on specific ingredients)",
      "working": "Unknown (depends on specific ingredients)"
    },
    {
      "name": "[Unspecified] spray",
      "use": "Likely for acne treatment",
      "dosage": "Apply twice daily",
      "sideeffects": "Unknown (depends on specific ingredients)",
      "working": "Unknown (depends on specific ingredients)"
    },
    {
      "name": "FASHX 7 MG",
      "use": "Unknown",
      "dosage": "Unknown",
      "sideeffects": "Unknown",
      "working": "Unknown" 
    },
    {
      "name": "Lt AD SHAMPOO",
      "use": "Likely for scalp condition related to acne or seborrheic dermatitis",
      "dosage": "Use every alternate day",
      "sideeffects": "Possible dryness or irritation of the scalp",
      "working": "Unknown (depends on specific ingredients), but likely contains anti-inflammatory or antifungal agents"
    },
    {
      "name": "IDERM LOTION",
      "use": "Likely for moisturizing and managing dry or irritated skin",
      "dosage": "Apply once daily",
      "sideeffects": "Possible mild skin irritation",
      "working": "Provides hydration and may contain ingredients that soothe and protect the skin barrier"
    }
  ],
  "extra_info": {
    "doctor_speciality": "Allergy",
    "provisional_diagnosis": "Acne",
    "review_after": "14 days",
    "hospital": "Max Super Speciality Hospital",
    "hospital_address": "FE50 C D Block Shalimar Bagh Delhi 110 088"
  }
}
``` 

**Important Notes:**

* **This information is extracted from a prescription and is NOT a substitute for professional medical advice.** 
* **The specific uses, dosages, side effects, and working mechanisms of medications can vary. Always follow your doctor's instructions and consult with them or a pharmacist if you have any questions.**
* Some medications in the prescription lack detailed information. It's crucial to clarify these details with the prescribing doctor or pharmacist to ensure safe and appropriate use.
* The "FASHX 7 MG" medication could not be identified. It is essential to verify this medication with the doctor. 