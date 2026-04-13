import { Word } from "./languages";
import { santhaliWords } from "./words-santhali";
import { gondiWords } from "./words-gondi";
import { kurukhWords } from "./words-kurukh";

export const allWords: Record<string, Record<string, Word[]>> = {
  santhali: santhaliWords,
  gondi: gondiWords,
  kurukh: kurukhWords,
};
