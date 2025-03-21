import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private apiUrl =
    'https://1r3w90y2fa.execute-api.us-east-1.amazonaws.com/api/';
  constructor(private http: HttpClient) {}

  getCampaignsByDateRange(
    startDate?: string,
    endDate?: string
  ): Observable<any> {
    let params = new URLSearchParams();

    if (startDate) {
      params.append('startDate', startDate);
    }
    if (endDate) {
      params.append('endDate', endDate);
    }
    const url = `${this.apiUrl}campaigns${
      params.toString() ? '?' + params.toString() : ''
    }`;

    return this.http.get(url);
  }

  createCampaign(campaign: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/campaigns`, campaign);
  }

  getMessagesByCampaignId(campaignId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages/campaign/${campaignId}`);
  }
  sendCampaign(campaignId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/campaigns/${campaignId}/send`, {});
  }
}
