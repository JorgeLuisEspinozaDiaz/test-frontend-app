import { FormsModule } from '@angular/forms';
import { CampaignService } from './../../services/campaign.service';
import { UsersService } from './../../services/users.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-campaign-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './campaign-form.component.html',
  styleUrl: './campaign-form.component.css',
  standalone: true,
})
export class CampaignFormComponent implements OnInit {
  @Output() campaignCreated = new EventEmitter<void>(); // Evento que notificará cuando se cree una campaña

  users: any[] = [];
  campaignData = {
    usuarioId: '',
    nombreCampana: '',
    fechaProcesamiento: '',
    horaProcesamiento: '',
    numeroTelefonos: '',
    mensajeTexto: '',
  };
  isFormSubmitted = false;


  constructor(
    private usersService: UsersService,
    private CampaignService: CampaignService
  ) {}
  private modalInstance: bootstrap.Modal | null = null;

  ngOnInit() {
    const modalElement = document.getElementById('myModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
    this.fetchUser();
  }

  fetchUser() {
    this.usersService.getUsers().subscribe(
      (response) => {
        console.log('Respuesta API:', response);
        this.users = response;
      },
      (error) => {
        console.error('Error fetching campaigns:', error);
      }
    );
  }

  submitCampaign() {
     if (
      !this.campaignData.usuarioId ||
      !this.campaignData.nombreCampana ||
      !this.campaignData.fechaProcesamiento ||
      !this.campaignData.horaProcesamiento ||
      !this.campaignData.numeroTelefonos ||
      !this.campaignData.mensajeTexto
    ) {
      return;
    }

    const campaignRequest = {
      user_id: Number(this.campaignData.usuarioId),
      name: this.campaignData.nombreCampana,
      process_date: this.campaignData.fechaProcesamiento,
      process_hour: this.campaignData.horaProcesamiento,
      process_status: 1,
      phone_list: this.campaignData.numeroTelefonos,
      message_text: this.campaignData.mensajeTexto
    };

    this.CampaignService.createCampaign(campaignRequest).subscribe(
      (response) => {
        console.log('Campaña creada con éxito:', response);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Campaña creada con éxito',
          confirmButtonText: 'Aceptar'
        });

        this.closeModal();
        this.campaignData = {
          usuarioId: '',
          nombreCampana: '',
          fechaProcesamiento: '',
          horaProcesamiento: '',
          numeroTelefonos: '',
          mensajeTexto: '',
        };
        this.campaignCreated.emit();

      },
      (error) => {
        console.error('Error al crear la campaña:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al crear la campaña',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

  openModal() {
    this.modalInstance?.show();
    this.isFormSubmitted = true;

  }

  closeModal() {
    this.campaignData = {
      usuarioId: '',
      nombreCampana: '',
      fechaProcesamiento: '',
      horaProcesamiento: '',
      numeroTelefonos: '',
      mensajeTexto: '',
    };
    this.modalInstance?.hide();
    this.isFormSubmitted = false;

  }
}
