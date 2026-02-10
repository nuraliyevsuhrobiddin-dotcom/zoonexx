
import { GoogleGenAI } from "@google/genai";

export const getLivestockRecommendation = async (
  animalType: string, 
  age: string, 
  weight: string, 
  goal: string, 
  imageUri?: string
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const textPart = {
    text: `Foydalanuvchi o'z hayvoni uchun professional tavsiya so'ramoqda:
    Hayvon turi: ${animalType}
    Yoshi: ${age}
    Vazni: ${weight}
    Asosiy maqsad: ${goal}
    
    Iltimos, quyidagilar bo'yicha batafsil tavsiya ber:
    1. Oziqlantirish ratsioni (maqsadga qarab).
    2. Sog'liqni saqlash va profilaktika.
    3. Hayvonning hozirgi holatiga baho.
    
    Javobni faqat O'zbek tilida, chiroyli va tushunarli punktlar bilan ber. Oxirida 'Zoonex AI - Sizning chorva yordamchingiz' deb yoz.`
  };

  const contents: any = { parts: [textPart] };

  if (imageUri) {
    const base64Data = imageUri.split(',')[1];
    contents.parts.unshift({
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Data
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    
    return response.text || "Kechirasiz, tavsiya olishda xatolik yuz berdi.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tavsiya olishda texnik xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.";
  }
};
