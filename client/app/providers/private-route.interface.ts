import { NextPage } from 'next'

//типизация наших ролей
export type TypeRoles = {
  isOnlyUser?: boolean
}

//именно чтобы писать защищенный роутинг
/* пример роутинга HomePage.isOnlyUser=true - тем самым мы показали защищенный роутинг */
export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles

//этот тип мы указыавем везде для типизации AuthProvider
export type TypeComponentAuthFields = { Component: TypeRoles }
