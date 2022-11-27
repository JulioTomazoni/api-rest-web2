import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex){
  return knex
    .schema
    .createTable(ETableNames.candidato, table => {
      table.bigIncrements('id').primary().index();
      table.string('nome', 50).index().notNullable();
      table.string('partido', 5).index().notNullable();
      table.string('cargo').index().notNullable();
      
      table.comment('Tabela para armazenar os candidatos do sistema');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.candidato}`);
    });
}

export async function down(knex: Knex){
  return knex
    .schema
    .dropTable(ETableNames.candidato)    
    .then(() => {
      console.log(`# Dropped table ${ETableNames.candidato}`);
    });
}

