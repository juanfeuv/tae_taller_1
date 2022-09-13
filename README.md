# Reporte Técnico de agrupación de universidades

## Introducción

El siguiente reporte técnico trata la agrupación de universidades en estados unidos a partir de datos que se proporcionan a través de informes federales de instituciones, datos sobre ayuda financiera federal e información fiscal. Estos datos brindan información sobre el desempeño de las escuelas que reciben dólares de ayuda financiera federal y los resultados de los estudiantes de esas escuelas.

Para realizar agrupaciones se hizo usó una documentación (<- link documentación) para poder encontrar variables de interés que cumplan con los objetivos del proyecto, 
los cuales son:
* Desarrollar un agrupamiento de instituciones de educación superior
* Caracterizar cada grupo
* Entender qué hace que un grupo sea una buena opción

Y se usaron métodos de aprendizaje no supervisado para entender que porcentaje de la varianza en los datos explicaban estas variables.

## Datos
Para poder implementar cualquier modelo se necesita tener un set de datos completo e imputado con el cual se puedan hacer análisis y operaciones sin inconvenientes.

Haciendo el análisis de porcentaje de valores faltantes se tiene que 1249 descriptores de los 1725 que tienen los datos, tienen más del 60% de valores como faltantes, por lo tanto, se tiene que hacer uso de la documentación para tratar de eliminar todo este ruido. Después de hacer la intercepción entre las variables de interés y los datos faltantes obtenemos las siguientes variables/columnas:

**INSTNM;** Nombre de la institución

**CONTROL;** Identifica si la estructura de gobierno de la institución es:

pública (1),

privada sin ánimo de lucro (2)

privada con ánimo de lucro (3).

HCM2; Es el tipo de HCM que indica problemas financieros o de cumplimiento federal más graves, HCM2 indica un sistema de supervisión mayor dadas irregularidades en la institución y HCM un nivel de monitoreo menor.

(1) tiene problemas (mayor monitoreo)

(0) No tiene problemas, menor monitoreo del dinero.

COSTT4_P; Es el costo de asistencia tomado del programa académico más cursado durante el año.

COSTT4_A; Costo de asistencia anual general para todos los estudiantes.

TUITIONFEE_IN; Costo y tasas de matrícula para estudiantes de dentro del estado

TUITIONFEE_OUT; Costo y tasas de matrícula para estudiantes de fuera del estado.

TUITIONFEE_PROG; Costo y tasas de matrícula general, tanto si es fuera o dentro del estado, esto son aquellas universidades que no cobran alguna diferencia por esto.

STABBR; Estado (ubicación)

Porcentaje de estudiantes dados los ingresos familiares.

INC_PCT_LO, (0-$30,000)

INC_PCT_M1, (30,001-$48,000)
INC_PCT_M2, (48,001-$75,000)
INC_PCT_H1, (75,001-$110,000)
INC_PCT_H2, ($110,001+)


De estas variables se puede agrupar a las instituciones universitarias por el perfil de estudiantes que tienen y sus costos 

Se obtiene la siguiente matriz de datos: (está en el colab de la media)
![image](https://user-images.githubusercontent.com/45887686/189778551-4dd102b3-8147-47dc-980c-04b9252bb7dc.png)

En donde blanco=Na, negro= hay dato

## Metodología
Para realizar la agrupación se utilizaron dos métodos diferentes, la primera fue imputar los datos faltantes como la media de toda la columna y hacer un análisis de componentes principales y por otro lado se usó la función iteractiveimputer() de sklearn con la que se _explicación_, claramente estos métodos usan medidas estandarizadas para tener una equivalencia entre variables.

### Agrupacion con datos imputados por la media Y PCA
Con los datos imputados por la media obtenemos la siguiente matriz de correlaciones:
![image](https://user-images.githubusercontent.com/45887686/189778911-cb322add-426f-46af-b128-94406e71f879.png)

De la cual se puede interpretar que existe una gran correlación entre todas las variables que hablan de costos mientras que para la variable COSTT4_* se tiene que entre la clase P y A no se encuentra correlación por lo que si se pueden clasificar como variables diferentes e incorrelacionadas. Por otra parte, las variables TUITTIONFEE_IN y TUITTIONFEE_OUT presentan una gran correlación por lo que se elimina la que tenga menos información que es TUITTIONFEE_OUT

## Resultados
Cuando se hace el análisis de componentes principales se obtienen los siguientes resultados:

Con TUITTIONFEE_OUT se obtiene que las tres primeras componentes están conformadas por:

* **PC1**
  * COSTT4_A
  * TUITTIONFEE_IN 
  * TUITTIONFEE_OUT 
  * INC_PCT_LO 
  * INC_PCT_H1 
  * INC_PCT_H2

* **PC2**
  * CONTROL 
  * COSTT4_A 
  * ITTIONFEE_IN 
  * INC_PCT_M1 
  * INC_PCT_M2 

* **PC3**
  * COSTT4_P 
  * TUITTIONFEE_PROGRAM 
  * Sin TUITTIONFEE_OUT

* **PC1**
  * COSTT4_A
  * TUITTIONFEE_OUT
  * INC_PCT_M2
  * INC_PCT_H2
  * INC_PCT_H1
  * INC_PCT_LO

* **PC2**
  * CONTROL
  * COSTT4_A
  * TUITTIONFEE_OUT
  * INC_PCT_M1
 
* **PC3**
  * COSTT4_P
  * TUITTIONFEE_PROG

## Conclusion de la agrupación por medias
![image](https://user-images.githubusercontent.com/45887686/189781635-50525c2d-fe8e-4740-9840-dc25ee1d2e8d.png)

Con las tres componentes principales conformadas se obtiene que las agrupaciones estiman el 64% de la varianza, lo cual no es muy eficiente. Pero si se fuera a dejar está agrupación se tendría tres agrupaciones con una base en los costos de las variables valor de universidad(TUITTIONFEE_*), los ingresos de la familia(INC_PCT_*) y en menor medida el tipo de estructura de gobierno que tiene la institución(CONTROL).

### Agrupacion con datos imputados por 
ITERATIVEIMPUTER() Y Cluster <-tipo de cluster 
Las únicas variables que no tienen datos faltantes son, INSTNM, CONTROL, HCM2 y STBBR, pero cuando se observan las variables INC_PCT_* notamos que tienen una gran cantidad de filas únicamente con el valor “PrivacySupressed”. Se asume esta notación como un valor faltante también.

1)Se rellenará los datos faltantes de las variables INC_PCT_* usando multiple imputation y basándose en la variable CONTROL. 
 
Con las columnas INC_PCT_* completas y sin ningún dato faltante, se puede pasar a la implementación.

## Código

El código respectivo al modelo de agrupación utilizado se puede consultar en el siguiente enlace, el cual además de estar en acá en github se encuentra en Colab: https://colab.research.google.com/drive/1KcbKdnSB0RVi2jDvougTG5ONDwDzwMsY?usp=sharing

## Integrantes










##Código
El código respectivo al modelo de agrupación utilizado se puede consultar en el siguiente enlace, el cual lleva a un repositorio de GitHub(<-hipervínculo) 
no olvidar:
los integrantes (no sé cómo ponerlos según el [ejemplo](https://rpubs.com/kaamayam/Accidentalidadtae))
septiembre de 2022	

referencias:
planteamiento para el enfoque de los datos: https://www.cbsnews.com/news/the-biggest-problems-with-americas-colleges/

