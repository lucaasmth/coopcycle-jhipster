import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourier } from '../courier.model';

@Component({
  selector: 'jhi-courier-detail',
  templateUrl: './courier-detail.component.html',
})
export class CourierDetailComponent implements OnInit {
  courier: ICourier | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ courier }) => {
      this.courier = courier;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
