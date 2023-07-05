import {Column, Model, Table } from 'sequelize-typescript';

@Table
export class Publication extends Model{
    @Column
    title: string;

    @Column
    tag: string;

    @Column
    body: string;
}