import { Turma } from "./models/Turma.js";
import { TurmaService } from "./services/TurmaService.js";
import { TurmaView } from "./views/TurmaView.js";

document.addEventListener("DOMContentLoaded", function() {
    const turma = new Turma(1, "Turma de Educação Física");
    const turmaService = new TurmaService(turma);
    const turmaView = new TurmaView("#turmaApp", turmaService);
    turmaView.init();
});
