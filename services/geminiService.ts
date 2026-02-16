
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getProductRecommendations(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Сиз "Нур-Базар" онлайн дүкөнүнүн акылдуу консультантысыз. Колдонуучунун суроосуна кыргыз же орус тилинде (суроого жараша) абдан сылык, кыска жана пайдалуу жооп бериңиз. Суроо: ${query}`,
      config: {
        systemInstruction: "Сиз 'Нур-Базар' дүкөнүнүн эксперт консультантысыз. Сиздин максатыңыз - Баткендин таза өрүктөрү, жаңгактар жана башка табигый кургатылган жемиштердин пайдасы тууралуу маалымат берүү жана тандоого жардам берүү. Жоопторду дайыма 'Нур-Базар' брендинин атынан бериңиз.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Кечиресиз, байланыш катасы кетти. Сураныч, кийинчерээк аракет кылып көрүңүз.";
  }
}
