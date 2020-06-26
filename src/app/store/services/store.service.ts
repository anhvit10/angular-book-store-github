import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private selectedProductId = new Subject<string>();
  selectedProductId$ = this.selectedProductId.asObservable();

  constructor(private http: HttpClient) { }

  setSelectedProductId(pid: string): void {
    this.selectedProductId.next(pid);
  }

}
