import { MetricCard } from "../components/MetricCard";
import { TaskCard } from "../components/TaskCard";

export function Dashboard() {
  return (
    <div>
      {/* Título */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Gerencie suas tarefas e acompanhe sua produtividade.
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <MetricCard
          title="Tarefas concluídas"
          value="12"
          description="+8% esta semana"
        />

        <MetricCard
          title="Tarefas pendentes"
          value="05"
          description="2 com prioridade alta"
        />

        <MetricCard
          title="Produtividade"
          value="86%"
          description="Excelente desempenho"
        />
      </div>

      {/* Tarefas recentes */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          Tarefas recentes
        </h2>

        <div className="flex flex-col gap-4">
          <TaskCard
            title="Finalizar layout do dashboard"
            status="Em andamento"
            priority="Alta"
          />

          <TaskCard
            title="Implementar autenticação"
            status="Concluído"
            priority="Média"
          />

          <TaskCard
            title="Criar responsividade mobile"
            status="Pendente"
            priority="Alta"
          />
        </div>
      </div>
    </div>
  );
}