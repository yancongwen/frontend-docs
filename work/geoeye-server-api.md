# Geoeye-server APIs old

## /

- / `GET`
- /clean `ALL`

## auth

- auth/login `POST`
- auth/logout `ALL`
- auth/chkuser `POST`

## datasource

- datasource/list `GET`
- datasource/groups `GET`
- datasource/list/:group `GET`
- datasource/get/:id `POST`
- datasource/list2 `GET`
- datasource/list2/:group `GET`
- datasource/types `GET`
- datasource/fieldtypes `GET`
- datasource/fieldtypes/:db `GET`
- datasource/tables/:database `GET`
- datasource/fields/:table `GET`
- datasource/fields/:database/:tablename `GET`
- datasource/readtable `GET`
- datasource/readtable/:table `GET`
- datasource/distinct `GET`
- datasource/\* `POST`
- datasource/json2table `POST`
- datasource/csv2table `POST`
- datasource/shp2table `POST`
- datasource/shpfiles2table `POST`
- datasource/drop `POST`
- datasource/add `POST`
- datasource/edit `POST`
- datasource/del `POST`
- datasource/testdb `POST`
- datasource/gwcatalog `POST`
- datasource/gwcatalognodes `POST`
- datasource/hashindex `GET`
- datasource `GET`

## modelnode

- modelnode/list `GET`
- modelnode/list2 `GET`
- modelnode/groups `GET`
- modelnode/list/:group `GET`
- modelnode/list2/:group `GET`
- modelnode/get/:id `GET`
- modelnode/types `GET`
- modelnode/\* `POST`
- modelnode/add `POST`
- modelnode/edit `POST`
- modelnode/del `POST`
- modelnode/run `ALL`
- modelnode/status `ALL`
- modelnode/:id/results `ALL`
- modelnode/:id/results/:paramId `ALL`
- modelnode/reschedule `POST`

## publishnode

- publishnode/list `GET`
- publishnode/list2 `GET`
- publishnode/list/:group `GET`
- publishnode/list2/:group `GET`
- publishnode/get/:id `GET`
- publishnode/\* `POST`
- publishnode/add `POST`
- publishnode/edit `POST`
- publishnode/del `POST`
- publishnode/pub/:id `POST`
- publishnode/nopub/:id `POST`
- publishnode/view/:pubid `GET`

## res

- res/list `GET`
- res/get/:id `GET`
- res/types `GET`
- res/add `POST`
- res/edit `POST`
- res/upload `POST`
- res/preupload `POST`
- res/download/:id `GET`
- res/del `POST`

## scenenode

- scenenode/list `GET`
- scenenode/list2 `GET`
- scenenode/list/:group `GET`
- scenenode/list2/:group `GET`
- scenenode/get/:id `GET`
- scenenode/\* `POST`
- scenenode/add `POST`
- scenenode/edit `POST`
- scenenode/del `POST`

## service

- service/wmts/getcapabilities `GET`

## tilelive

!> 未实现

- tilelive/:service/tiles/:x/:y/:z `GET`
- tilelive/:service/vtiles/:x/:y/:z `GET`

## log

!> 未实现

- list/\* `GET`
- log/list `GET`
- log/file/:file `GET`
- log/flush `GET`

## table

!> 未实现
