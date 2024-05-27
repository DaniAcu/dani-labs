const images = [
    "M2T1j-6Fn8w",
    "464ps_nOflw",
    "5BB_atDT4oA",
    "O38Id_cyV4M",
    "mW8IZdX7n8E",
    "30UOqDM5QW0",
    "MEZDyn98La8",
    "fJzmPe-a0eU",
    "EOIToTneyZ4",
    "5gdxBw2VyVI",
    "pT2zu7UsoX4",
    "AwIRvq1hNcg",
    "lnkuSyPXZiE",
] as const;

type Id = (typeof images)[number];


export const ImageManager = {
    images,
    get: (id: Id, quality: 'normal' | 'high' | 'low' = 'normal') => {
        return `/unslash/${id}---${quality}`
    }

}

export default ImageManager;