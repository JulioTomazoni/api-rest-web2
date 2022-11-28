import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex){
  return knex
    .schema
    .createTable(ETableNames.voto, table => {
      table.bigIncrements('id').primary().index();
      table.integer('cpf', 11).index().unique().notNullable();
      table.string('sexo', 1).index().notNullable();
      table.integer('idCandidato').index().notNullable();
      table.foreign('idCandidato')
        .references('candidato.id')
        .onDelete('NO ACTION')
        .onUpdate('NO ACTION');      
      table.comment('Tabela para armazenar os votos do sistema');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.voto}`);
    });
}

export async function down(knex: Knex){
  return knex
    .schema
    .dropTable(ETableNames.voto)    
    .then(() => {
      console.log(`# Dropped table ${ETableNames.voto}`);
    });
}

