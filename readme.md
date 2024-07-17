-text from gemini validation for json
- add date and name instead of expand collapse in history 

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