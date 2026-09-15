export type AppScreen = 'initial' | 'oops' | 'birthday' | 'letter' | 'hug' | 'proposal';

export interface AppCustomization {
  recipientName: string;
  specialDate: string;
  birthdayWish: string;
  letterTitle: string;
  letterGreeting: string;
  letterParagraph1: string;
  letterParagraph2: string;
  letterClosing: string;
  letterSignature: string;
  letterSecretKey?: string;
  letterHint?: string;
  missYouText: string;
  proposalQuestion: string;
  customMusicUrl: string;
  photos: {
    photo1: string;
    photo2: string;
    photo3: string;
    photo4: string;
  };
}
