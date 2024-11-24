import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SurveyPropertieService } from '../survey-propertie/survey-propertie.service';
import { SurveyUserService } from '../survey-user/survey-user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';


@Injectable()
export class ReportService {

  constructor(
    private userService: UsersService,
    private surveyPropertieService: SurveyPropertieService,
    private surveyUserService: SurveyUserService,
  ) { }

  async reportEntities() {
    const users = await this.userService.getUsersByRol('entidad');
    return users?.map(user => ({
      codigo: user?.incremental,
      nombre: user?.name,
      email: user?.email,
      telefono: user?.cell_phone,
      direccion: user?.address,
      nit: user?.nit,
      usuario_validado: user?.user_validated ? 'si' : 'no',
      razon_rechazo: user?.user_validated_reason || '',
    }));
  }

  async reportSurveys() {
    const [users, properties, surveys] = await Promise.all([
      this.userService.getUsersByRol('beneficiario'),
      this.surveyPropertieService.findAll(),
      this.surveyUserService.findAll(),
    ]);
    const propertie_id_name: { [_id: string]: string } = {};
    properties.forEach(property => propertie_id_name[property._id?.toString()] = property?.propertie);

    const user_id_object: { [_id: string]: { user: CreateUserDto, surveys: { [propertie_id: string]: any } } } = {};
    users.forEach(user => user_id_object[user._id?.toString()] = { user: user as any, surveys: {} });

    surveys.forEach(survey => {
      if (!user_id_object[survey?.user?.toString()]) return;
      user_id_object[survey?.user?.toString()].surveys[survey?.propertie] = survey?.value
    });


    const report: any[] = [];
    for (const user_id in user_id_object) {
      const user = user_id_object[user_id].user;

      const response: any = {
        codigo: user?.incremental,
        nombre: user?.name,
        email: user?.email,
        telefono: user?.cell_phone,
        direccion: user?.address,
        nit: user?.nit,
      };
      for (const propertie_id in propertie_id_name) {
        const propertie_name = propertie_id_name[propertie_id];
        response[propertie_name] = '';

        const user_propertie = user_id_object[user_id]?.surveys[propertie_id];
        if (!user_propertie) continue;
        response[propertie_name] = user_propertie;
      }

      report.push(response);
    }
    return report;
  }
}
