export type FalucheStatus = 'SYMPATHISANT' | 'IMPETRANT' | 'BAPTISÉ' | 'OTHER' | null;

export function getFalucheStatus (status: FalucheStatus) {
    if (!status) {
        return null;
    }
    switch (status) {
        case 'SYMPATHISANT':
            return 'Sympathisant';
        case 'IMPETRANT':
            return 'Impétrant';
        case 'BAPTISÉ':
            return 'Baptisé';
        case 'OTHER':
            return 'Autre folklore';
    }
}
