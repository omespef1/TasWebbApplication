import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "statesRequestProgramming",
})
export class StatesRequestProgrammingPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    switch (value) {
      case "F":
        return "FINAL";
      case "I":
        return "INICIO";
      case "O":
        return "ORIGEN";
      case "R":
        return "EN RUTA";
        case "E":
        return "RECOGIDA";
        case "N":
        return "NO RECOGIDA";
      default:
        return "NO DEFINIDO";
    }
  }
}
