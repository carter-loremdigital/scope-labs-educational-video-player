import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

// Check strings for profanity
export const containsProfanity = (text: string) => {
  return matcher.hasMatch(text);
};
