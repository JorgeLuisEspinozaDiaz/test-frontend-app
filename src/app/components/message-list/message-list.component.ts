import { CommonModule } from '@angular/common';
import { CampaignService } from './../../services/campaign.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-message-list',
  imports: [CommonModule],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
  standalone: true,
})
export class MessageListComponent implements OnInit {
  private modalInstance: bootstrap.Modal | null = null;
  @Input() idDetalleMessage: number | null = null; // Recibe el ID como prop


  messages: any[] = [];
  constructor(private CampaignService: CampaignService) {
  }
  ngOnInit() {
    const modalElement = document.getElementById('myModaldetail');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
   }

   ngOnChanges(changes: SimpleChanges) {
    if (changes['idDetalleMessage'] && changes['idDetalleMessage'].currentValue !== null) {
      this.fetchMessage(changes['idDetalleMessage'].currentValue);
    }
  }
  openModal() {
    this.modalInstance?.show();
  }

  closeModal() {
    this.modalInstance?.hide();
  }

  fetchMessage(id:number) {
    this.CampaignService.getMessagesByCampaignId(id).subscribe(
      (response) => {
        console.log('Respuesta API:', response);
        this.messages = response;
      },
      (error) => {
        console.error('Error fetching campaigns:', error);
      }
    );
  }

  getStatusClass(status: string): string {
    if (!status) return '';
    const statusMap: { [key: string]: string } = {
      'pendiente': 'estado pendiente',
      'enviado': 'estado enviado',
      'error': 'estado error'
    };
    return statusMap[status] || 'default-status';
  }
}
