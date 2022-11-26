# Reporte Técnico

## Integrantes
* Julian David Ruiz Herrera
* Juan Felipe Usuga Villegas
* Jonatan Urrego Zea
* Johan Sebastian Cano Garcia
* Raul vladimir Gaitan Vaca

## Consideraciones
* Video youtube: https://www.youtube.com/watch?v=Tsezvuh_IAw
* Link APP: https://zesty-puffpuff-d5a7f7.netlify.app/ 

**Taller de Clustering no supervisado:  Información de instituciones de educación superior en U.S.**

1. **Introducción**

El siguiente reporte técnico trata la agrupación de universidades en Estados Unidos a partir de datos que se proporcionan a través de informes federales de instituciones, datos sobre ayuda financiera federal e información fiscal. Estos datos brindan información sobre el desempeño de las escuelas que reciben dólares de ayuda financiera federal y los resultados de los estudiantes de esas escuelas.

Para realizar agrupaciones se hizo usó una de una documentación para poder encontrar variables de interés que cumplan con los objetivos del proyecto,

los cuales son:

- Desarrollar un agrupamiento de instituciones de educación superior
- Caracterizar cada grupo
- Entender qué hace que un grupo sea una buena opción

Y se usaron métodos de aprendizaje no supervisado para entender qué porcentaje de la varianza en los datos explicaban estas variables.

2. **Desarrollo técnico**
1. **Selección de los datos a usar**

Para poder implementar cualquier modelo se necesita tener un set de datos completo e imputado con el cual se puedan hacer análisis y operaciones sin inconvenientes. Para poder seleccionar el mejor grupo de variables, nos basamos en la documentación y mediante un análisis de componentes principales que hicimos en paralelo.

**2.1.1 Análisis de componentes principales**

Haciendo el análisis de porcentaje de valores faltantes se tiene que 1249 descriptores de los 1725 que tienen los datos, tienen más del 60% de valores como faltantes, por lo tanto, se tiene que hacer uso de la documentación para tratar de eliminar todo este ruido. (Anexo 1)

Después de hacer la intercepción entre las variables de interés y los datos faltantes obtenemos las siguientes variables/columnas:

**INSTNM**; Nombre de la institución

**CONTROL**; Identifica si la estructura de gobierno de la institución es: pública (1),

privada sin ánimo de lucro (2)

privada con ánimo de lucro (3).

**HCM2**; Es el tipo de HCM que indica problemas financieros o de cumplimiento federal más graves, HCM2 indica un sistema de supervisión mayor dadas irregularidades en la institución y HCM un nivel de monitoreo menor.

(1) tiene problemas (mayor monitoreo)

0) No tiene problemas, menor monitoreo del dinero.

**COSTT4\_P**; Es el costo de asistencia tomado del programa académico más cursado durante el año.

**COSTT4\_A**; Costo de asistencia anual general para todos los estudiantes. **TUITIONFEE\_IN**; Costo y tasas de matrícula para estudiantes de dentro del estado **TUITIONFEE\_OUT**; Costo y tasas de matrícula para estudiantes de fuera del estado.

**TUITIONFEE\_PROG**; Costo y tasas de matrícula general, tanto si es fuera o dentro del estado, esto son aquellas universidades que no cobran alguna diferencia por esto.

**STABBR**; Estado (ubicación)

Porcentaje de estudiantes dados los ingresos familiares. **INC\_PCT\_LO**, (0-$30,000)

**INC\_PCT\_M1**, (30,001-$48,000)

**INC\_PCT\_M2,** (48,001-$75,000)

**INC\_PCT\_H1**, (75,001-$110,000)

**INC\_PCT\_H2**, ($110,001+)

De estas variables se puede agrupar a las instituciones universitarias por el perfil de estudiantes que tienen y sus costos

Se obtiene la siguiente matriz de datos:

![image](https://user-images.githubusercontent.com/45887686/204106077-ec12f5c2-c113-460c-b727-0859fbe27c2b.png)

En donde blanco=Na, negro= hay dato

1. **Metodología**

Para realizar la agrupación se utilizaron dos métodos diferentes, la primera fue imputar los datos faltantes como la media de toda la columna y hacer un análisis de componentes principales y por otro lado se usó la función iteractiveimputer() de sklearn con la que se busca hacer imputación utilizando métodos estadísticos más robustos, claramente estos métodos usan medidas estandarizadas para tener una equivalencia entre variables.

2. **Agrupación con datos imputados por la media Y PCA**

Con los datos imputados por la media obtenemos la siguiente matriz de correlaciones:

![image](https://user-images.githubusercontent.com/45887686/204106160-78060ef0-ecff-421d-9b22-7ddceb6cf6f4.png)

De la cual se puede interpretar que existe una gran correlación entre todas las variables que hablan de costos mientras que para la variable COSTT4\_\* se tiene que entre la clase P y A no se encuentra correlación por lo que sí se pueden clasificar como variables diferentes e incorrelacionadas. Por otra parte, las variables TUITTIONFEE\_IN y TUITTIONFEE\_OUT presentan una gran correlación por lo que se elimina la que tenga menos información que es TUITTIONFEE\_OUT

3. Resultados

Cuando se hace el análisis de componentes principales se obtienen los siguientes resultados:

![image](https://user-images.githubusercontent.com/45887686/204106245-a6bfec4b-69fd-4c21-95d9-34ff65fefdd0.png)

![image](https://user-images.githubusercontent.com/45887686/204106300-72b41fca-c323-454d-99e3-4588eea580fe.png)

4. **Conclusión de la agrupación por medias**

![image](https://user-images.githubusercontent.com/45887686/204106395-f48c0fe2-88fa-4a4b-b592-199a1216c6b5.png)

Con las tres componentes principales conformadas se obtiene que las agrupaciones estiman el 64% de la varianza, lo cual no es muy eficiente. Pero si se fuera a dejar está agrupación se tendría tres agrupaciones con una base en los costos de las variables valor de universidad(TUITTIONFEE\_\*), los ingresos de la familia(INC\_PCT\_\*) y en menor medida para la tercera componente el tipo de estructura de gobierno que tiene la institución(CONTROL).

**2.1.14 Agrupación con datos imputados por ITERATIVEIMPUTER() Y Cluster**

Las únicas variables que no tienen datos faltantes son, INSTNM, CONTROL, HCM2 y STBBR, pero cuando se observan las variables INC\_PCT\_\* notamos que tienen una gran cantidad de filas únicamente con el valor “PrivacySupressed”. Se asume esta notación como un valor faltante.

Se rellenará los datos faltantes de las variables INC\_PCT\_\* usando multiple imputation y basándose en la variable CONTROL.  

![image](https://user-images.githubusercontent.com/45887686/204106407-825840f6-888d-421b-a7a4-768ee99f23b9.png)

Con las columnas INC\_PCT\_\* completas y sin ningún dato faltante, se puede pasar a imputar COSTT4\_\* y TUITTIONFEE\_\*.

Para la variable COSTT4\_\* leyendo la documentación se observa que aunque parezca que tienen muchos datos nulos, son complementarias, pues cada una se corresponde al costo de matrícula para un tipo específico de universidad entre dos posibles, es decir que para el manejo de datos faltantes en estas dos variables se combinan en una de las columnas los datos de ambas.

Entonces, cambiando los valores faltantes de uno por los complementarios del otro se obtiene que

![image](https://user-images.githubusercontent.com/45887686/204106427-dfcc394f-3591-42d1-95ab-f1aaa51fe279.png)

Respecto a las variables TUITIONFEE\_\* dado que TUITIONFEE\_IN y TUITIONFEE\_OUT son variables que nos hablan del costo de matrícula para estudiantes del mismo estado y fuera el estado, podemos tomar el TUITIONFEE\_PROG como un valor para llenar los elementos faltantes de TUITIONFEE\_IN tal como en el caso anterior.

**Datos a usar:**

Dado el análisis realizado de la documentación y de las PCA, decidimos usar en un principio las siguientes variables:

**INSTNM**; Nombre de la institución

**CONTROL**; Identifica si la estructura de gobierno de la institución es: pública (1),

privada sin ánimo de lucro (2)

privada con ánimo de lucro (3).

**HCM2**; Es el tipo de HCM que indica problemas financieros o de cumplimiento federal más graves, HCM2 indica un sistema de supervisión mayor dadas irregularidades en la institución y HCM un nivel de monitoreo menor.

1) tiene problemas (mayor monitoreo)
0) No tiene problemas, menor monitoreo del dinero.

**COSTT4\_P**; Es el costo de asistencia tomado del programa académico más cursado durante el año.

**COSTT4\_A**; Costo de asistencia anual general para todos los estudiantes. **TUITIONFEE\_IN**; Costo y tasas de matrícula para estudiantes de dentro del estado **TUITIONFEE\_OUT**; Costo y tasas de matrícula para estudiantes de fuera del estado.

**TUITIONFEE\_PROG**; Costo y tasas de matrícula general, tanto si es fuera o dentro del estado, esto son aquellas universidades que no cobran alguna diferencia por esto.

**STABBR**; Estado (ubicación)

Porcentaje de estudiantes dados los ingresos familiares. **INC\_PCT\_LO**, (0-$30,000)

**INC\_PCT\_M1**, (30,001-$48,000)

**INC\_PCT\_M2,** (48,001-$75,000)

**INC\_PCT\_H1**, (75,001-$110,000)

**INC\_PCT\_H2**, ($110,001+)

2. **Manejo de los datos faltantes**

Para poder realizar nuestro análisis adecuadamente debemos verificar y arreglar si es el caso los datos faltantes.

En nuestro proceso nos encontramos con 3 conjuntos de variables relacionadas a los cuales les faltaban valores y estos eran posibles completar. estos serían: **INC\_PCT\_\*,  COSTT4\_\*, TUITIONFEE\_\*.**

1. **Para INC\_PCT\_\***

Para estas variables llenaremos los datos faltantes usando multiple imputation y basándose en la variable CONTROL, además aprovechamos y cambiamos el formato.

**Antes**

![image](https://user-images.githubusercontent.com/45887686/204106530-c4da0cb2-fc05-4353-bd60-43d5c6c48860.png)

**Después:**

![image](https://user-images.githubusercontent.com/45887686/204106564-d0f7ed9c-5ae9-4650-bfc8-2e1b7a34239c.png)

2. **Para COSTT4\_\***

Dado que cuando se tenía un costo anual general para los estudiantes no se suele tener un costo por programa anual de los mismos, pero si se tiene cuando falta, podemos decir que estas 2 variables se auto complementan, por eso decidimos combinarlas para reducir la cantidad de nulos. (Esta combinación la hacemos en la variable **COSTT4\_A**).

**Antes:**

![image](https://user-images.githubusercontent.com/45887686/204106584-4a918732-4353-41d2-a6a0-e9d895735aef.png)

**Después:**

![image](https://user-images.githubusercontent.com/45887686/204106601-36dd4b90-d037-4356-b818-64d82420dbe6.png)

3. **Para TUITIONFEE\_\***

Para este caso hacemos algo similar al anterior, pero esta vez combinamos en **TUITIONFEE\_IN** y **TUITIONFEE\_OUT** la variable **TUITION FEE PROG.**

**Antes**

![image](https://user-images.githubusercontent.com/45887686/204106612-66cdc44a-99fd-4636-82b3-ba76810db408.png)

**Después**

![image](https://user-images.githubusercontent.com/45887686/204106624-cb73c938-3edd-4461-9cb4-6c7cba17cfee.png)

3. **Análisis de nuestras variables**

Antes de continuar analizamos cómo se correlacionan estas variables, para así poder descartar aquellas que no nos sirvan. Además hacemos unos cambios en el nombre de las variables para poder entenderlas más fácilmente.

![image](https://user-images.githubusercontent.com/45887686/204106648-42ca420a-ffd0-4e8b-8e31-ec9a065003a0.png)

Descartamos aquellas variables con mucha correlación y dejamos las que consideramos nos pueden ayudar más en nuestro análisis.

![image](https://user-images.githubusercontent.com/45887686/204106727-35d10b50-54d3-4332-9cda-358435e38f64.png)

![image](https://user-images.githubusercontent.com/45887686/204106734-d39f1d00-8b59-4648-9407-252f6af288be.png)

4. **Cantidad óptima de clusters**

Encontramos que el número óptimo de clusters para nuestro conjunto de datos es de 3, este valor se encontró mediante los siguientes análisis.

1. **Dendograma**

Mediante este método encontramos que el número óptimo de clusters podría ser de 2, 3 y hasta 4 grupos.

![image](https://user-images.githubusercontent.com/45887686/204106785-fba99d97-d269-4434-a293-09f88efd4d0a.png)

2. **Elbow Curve**

De este método podemos concluir que el número óptimo de clusters está entre 3 o 4 clusters.

![image](https://user-images.githubusercontent.com/45887686/204106798-ccdb3243-5347-439a-83ba-cab0d37b366d.png)

3. **Estadístico de Gap**

Para este caso el método no nos arroja información clara sobre el número óptimo de clusters, se podría decir que en 3 clusters hay un pequeño cambio que podría ser tomado en cuenta, aun así no lo consideramos como una señal clara.

![image](https://user-images.githubusercontent.com/45887686/204107013-38cf8e2e-41b6-4720-b98c-b4ef0dcd92ca.png)

4. **Coeficiente de Silueta**

Para este método vemos que 3 es el número óptimo de clusters.

![image](https://user-images.githubusercontent.com/45887686/204107019-f6150bd9-222e-4c36-9666-813da50804c9.png)

![image](https://user-images.githubusercontent.com/45887686/204107040-ce522441-c764-48da-86c4-af4a7eb79604.png)

![image](https://user-images.githubusercontent.com/45887686/204107048-dbd001da-32b5-4b90-a0f3-be0292b8e6c8.png)

![image](https://user-images.githubusercontent.com/45887686/204107057-b9f6e58f-0238-479e-a3db-3111915a05c8.png)

5. **Clustering - Jerárquico**

Ya teniendo el número de clusters más óptimo, realizamos el agrupamiento.

![image](https://user-images.githubusercontent.com/45887686/204107069-cde7c373-ac87-4937-b509-f2b61722acb6.png)

![image](https://user-images.githubusercontent.com/45887686/204107074-61a4c293-51d1-4ea9-80e1-c25390f86df1.png)

![image](https://user-images.githubusercontent.com/45887686/204107082-182380ae-36c7-4600-9561-8f6f47d06a1c.png)

3. **Caracterización**

**Grupo 0:**

![image](https://user-images.githubusercontent.com/45887686/204107111-5c16ce61-f810-4d9a-af23-45945dadea1f.png)

![image](https://user-images.githubusercontent.com/45887686/204107117-4a02922a-ca45-4b92-b85d-fd3d94789629.png)

**Grupo 1:**

![image](https://user-images.githubusercontent.com/45887686/204107121-9a2957ca-b8ec-40b7-834a-17d2281cfc19.png)

![image](https://user-images.githubusercontent.com/45887686/204107196-7ccada6f-71d7-4096-ad78-851cca8725bd.png)

**Grupo 2:**

![image](https://user-images.githubusercontent.com/45887686/204107200-0de01835-20a3-44db-ab27-241f0ab1247c.png)

![image](https://user-images.githubusercontent.com/45887686/204107207-c8a83195-6bd8-48f8-bb26-63bf3c61de20.png)

4. **Conclusiones del agrupamiento**
1. **Conclusión**

Grupo 0 (Azul): En este grupo se encuentran universidades con un costo promedio de matrícula de (16000 dólares), pero que puede llegar a variar mucho. En este grupo se encuentra un mayor porcentaje de estudiantes M1 en comparación con los de H2.

Grupo 1 (Rosado): En este grupo se encuentran universidades con un costo promedio de matrícula de (28000 dólares), siendo este el grupo con el mayor costo promedio de matrícula y el mayor porcentaje de estudiantes H2.

Grupo 2 (Amarillo): En este grupo se encuentran universidades con un costo promedio de matricula de (4000 dolares), siendo este el grupo con el menor costo promedio de matricula y el mayor porcentajes de estudiantes M1.

\- Dado todo el análisis anterior podríamos resumir los 3 grupos en los siguiente: Grupo 0: Universidades de costo medio y con estudiantes principalmente de clase media Grupo 1: Universidades de costo alto y estudiantes principalmente de clase alta

Grupo 2: Universidades de costo bajo y estudiantes principalmente de clase media

2. **Conclusión**

También encontramos que existe una relación entre los grupos que encontramos, con la variable \*CONTROL\*. Recordemos que esta variable nos identifica si la estructura de gobierno de la institución es:

1) Pública.
1) Privada sin ánimo de lucro.
1) Privada con ánimo de lucro.

Vemos que nuestro grupo 2 conformado por las universidades con menor costo promedio de matrícula está relacionado con aquellas universidades que son públicas.

Vemos que nuestro grupo 1 conformado por las universidades con mayor costo promedio de matrícula está relacionado con aquellas universidades que son privadas sin ánimo de lucro.

Finalmente también vemos que para nuestro grupo 0 con los costos medios se relaciona con aquellas universidades que son privadas con ánimo de lucro.

![image](https://user-images.githubusercontent.com/45887686/204107282-18acf67c-b470-441b-82b9-07f9e8f7e5ea.png)

Dado el control.

![image](https://user-images.githubusercontent.com/45887686/204107293-8b0d2b49-e451-4986-82a0-83068040fe56.png)

**5. Cómo implementar esto en Colombia**

Para generar un conjunto de datos que nos permita hacer esto en Colombia necesitamos al menos recopilar variables que funjan como equivalentes a las variables que utilizamos para el contexto colombiano. En general los valores de matrícula y los costos anuales o semestrales están aproximadamente bien cubiertos considerando una clasificación de las universidades por ciudad o

por departamento. Solo quedaría evaluar un equivalente a las variables HCM\_PCT\_\*Para el contexto colombiano el dato más descriptivo y de fácil acceso es el porcentaje de estudiantes por estrato socioeconómico por universidad. En general no es bien conocido el porcentaje actualizado de estudiantes por estrato socioeconómico en todas las universidades del país y se tendría que empezar a hacer encuestas demográficas para obtener esta información. Los demás datos necesarios en general son conocidos o de acceso relativamente fácil, por lo que una vez obtenido el porcentaje de estudiantes por estrato socioeconómico este análisis realizado se puede replicar para Colombia.

Es posible hacer un análisis similar sin clasificar las universidades geográficamente dado que en general en todo el territorio nacional los costos son similares en comparación con las diferencias que hay entre estados de Estados Unidos, de manera que se consideren todas las universidades del país y se haga todo el análisis directamente.

**Referencias:**

planteamiento para el enfoque de los datos: https://www.cbsnews.com/news/the-biggest-problems-with-americas-colleges/

