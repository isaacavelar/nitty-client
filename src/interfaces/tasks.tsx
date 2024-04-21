export interface Task {
    _id:       string;
    name:      string;
    progress:  number;
    status:    number;
    startDate: string;
    completionDate: string;
    user:      string;
    words:     Word[];
    id:        string;
}

export interface Word {
    word:                         string;
    currentDifficulty:            string;
    qtdConsecutiveCorrectGuesses: number;
    qtdConsecutiveVeryEasy:       number;
    status:                       number;
    translation:                  string;
    _id:                          string;
    id:                           string;
}
