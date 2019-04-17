import { Observable } from 'rxjs';

export interface ICrud<T> {
    get(id: number): Observable<T>;
    getAll(): Observable<T[]>;
    insert(model: T): Observable<T>;
    update(model: T): Observable<T>;
    delete(model: T): Observable<T>;
}
