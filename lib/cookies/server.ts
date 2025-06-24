import { cookies } from "next/headers";
import { COOKIE_KEYS } from "./keys";
import { ChatPreferences } from "./types";

// Server-side cookie utilities
export const serverCookieUtils = {
  // Get all preferences from server-side cookies
  async getPreferences(): Promise<ChatPreferences> {
    try {
      const cookieStore = await cookies();

      return {
        selectedChatModel:
          cookieStore.get(COOKIE_KEYS.SELECTED_CHAT_MODEL)?.value || undefined,

        imageGenerationModel:
          cookieStore.get(COOKIE_KEYS.IMAGE_GENERATION_MODEL)?.value ||
          undefined,
        useNativeSearch:
          cookieStore.get(COOKIE_KEYS.USE_NATIVE_SEARCH)?.value || false,
        toolkit: cookieStore.get(COOKIE_KEYS.TOOLKIT)?.value || [],
      };
    } catch (error) {
      console.log("Failed to read cookies.");
      if (error instanceof Error) {
        console.log("error.stack is ", error.stack);
        console.log("error.message is ", error.message);
      }
      return {};
    }
  },
};
