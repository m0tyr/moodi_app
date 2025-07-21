export interface User {
  id: string;
  username: string;
  myMoodi: Moodi | null;
  createdAt: string;
  lastLogin: string;
}

export interface UserCreate extends User {
  password: string;
}

export enum Emoji {
    HAPPY = 'HAPPY',
    SAD = 'SAD',
    ANGRY = 'ANGRY',
    EXCITED = 'EXCITED',
    TIRED = 'TIRED',
    LOVE = 'LOVE',
    ANXIOUS = 'ANXIOUS',
    CALM = 'CALM',
    SURPRISED = 'SURPRISED',
    CONFUSED = 'CONFUSED',
    GRATEFUL = 'GRATEFUL',
    DISAPPOINTED = 'DISAPPOINTED',
    MOTIVATED = 'MOTIVATED',
    PEACEFUL = 'PEACEFUL',
    FRUSTRATED = 'FRUSTRATED'
}

export interface Moodi {
  id: string;
  name: string;
  category: string;
  userId: string;
  emoji: Emoji;
}

export interface MoodiCreate {
    name: string;
    category: string;
    emoji: Emoji;
}
