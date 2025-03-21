import { Component, ViewChild } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { CommonModule } from '@angular/common';
import { CampaignFormComponent } from "../campaign-form/campaign-form.component";
import { MessageListComponent } from '../message-list/message-list.component';
import { FormsModule } from '@angular/forms';  // <-- Importación correcta
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campaign-list',
  imports: [CommonModule, CampaignFormComponent, MessageListComponent, FormsModule],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.css',
  standalone: true,
})
export class CampaignListComponent {
  campaigns: any[] = [];
  startDate: string | null = null;
  endDate: string | null = null;
  date = null;
  idDetalleMessage: number | null = null;

  constructor(private campaignService: CampaignService) { }
  @ViewChild(CampaignFormComponent) campaignForm!: CampaignFormComponent;
  @ViewChild(MessageListComponent) campaignDetalle!: MessageListComponent;


  ngAfterViewInit() {
    console.log('CampaignFormComponent inicializado:', this.campaignForm);

  }

  openModal() {
    if (this.campaignForm) {
      this.campaignForm.openModal();
    } else {
      console.error('El modal no está disponible aún.');
    }
  }




  openModalDetalle(id: number) {
    if (this.campaignDetalle) {
      this.campaignDetalle.openModal();
    } else {
      console.error('El modal no está disponible aún.');
    }
    this.idDetalleMessage = id
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }



  filterCampaigns() {
    if (!this.startDate || !this.endDate) {
      console.error('Por favor, selecciona ambas fechas.');
      return;
    }

    this.fetchCampaigns();
  }


  resetearCampaigns() {
    this.startDate = null;
    this.endDate = null;
    this.fetchCampaigns();
  }


  ngOnInit(): void {
    this.fetchCampaigns();
    console.log(this.startDate);
    console.log(this.endDate);
  }

  onDateChange() {
    console.log('Fecha de inicio:', this.startDate);
    console.log('Fecha de fin:', this.endDate);
  }

  fetchCampaigns() {
    this.campaignService.getCampaignsByDateRange(this.startDate!, this.endDate!).subscribe(
      (response) => {
        console.log('Respuesta API:', response);
        this.campaigns = response;
      },
      (error) => {
        console.error('Error fetching campaigns:', error);
      }
    );
  }

  confirmSendCampaign(event: Event, item: any) {
    const checkbox = event.target as HTMLInputElement;
    Swal.fire({
      title: '¿Está seguro de notificar esta campaña?',
      text: "Esta acción enviará la campaña.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, notificar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.campaignService.sendCampaign(item.campaign_id).subscribe(
          () => {
            Swal.fire('¡Enviado!', 'La campaña ha sido notificada.', 'success');
            this.fetchCampaigns()
          },
          () => {
            Swal.fire('Error', 'Hubo un problema al notificar.', 'error');
            checkbox.checked = false;
          }
        );
      } else {
        checkbox.checked = !checkbox.checked;
      }
    });


  }
  getStatusClass(status: string): string {
    if (!status) return '';
    const statusMap: { [key: string]: string } = {
      'Finalizada': 'estado finalizado',
      'En proceso': 'estado en-proceso',
      'Pendiente': 'estado pendiente'
    };
    return statusMap[status] || 'default-status';
  }
}

