export const WARMUP = {
  duration: 180,
  items: [
    "Marcha no lugar — 45 s",
    "Círculos de ombros — 45 s",
    "Gato-vaca no colchonete — 45 s",
    "Agachamento curto sem elástico — 45 s"
  ]
};

export const WORKOUTS = {
  A: {
    code: "A",
    title: "Empurrar + quadríceps",
    subtitle: "Ombros, peito, tríceps, quadríceps e panturrilhas",
    estimatedMinutes: 30,
    accent: "violet",
    exercises: [
      {
        id: "a-squat-miniband",
        block: 1,
        name: "Agachamento com mini band",
        muscles: "Quadríceps e estabilizadores do quadril",
        equipment: "Elástico curto (mini band)",
        bandType: "curto",
        sets: 2,
        target: "12–15",
        defaultReps: 12,
        perSide: false,
        posture: true,
        videoId: "Ga4ogr-ji_s",
        steps: [
          "Coloque a mini band logo acima dos joelhos e afaste os pés na largura dos quadris.",
          "Desça dobrando joelhos e quadris, mantendo o peito aberto e os calcanhares apoiados.",
          "Empurre levemente os joelhos para fora, alinhados aos pés.",
          "Pressione o chão para subir, sem travar os joelhos no final."
        ],
        cues: "Mantenha o peso no pé inteiro e permita que os joelhos avancem alinhados aos dedos.",
        mistakes: "Joelhos caindo para dentro, calcanhares levantando ou lombar arredondada."
      },
      {
        id: "a-calf-raise",
        block: 1,
        name: "Elevação de panturrilhas em pé",
        muscles: "Panturrilhas",
        equipment: "Parede ou cadeira para apoio opcional",
        bandType: "nenhum",
        sets: 2,
        target: "15–20",
        defaultReps: 15,
        perSide: false,
        posture: true,
        videoId: "fZYTVO9-Ggk",
        steps: [
          "Fique em pé com os pés paralelos e use a parede ou uma cadeira apenas para equilíbrio.",
          "Distribua o peso entre a base do dedão, a base do dedo mínimo e o calcanhar.",
          "Eleve os calcanhares o máximo que conseguir sem deixar os tornozelos virarem para fora.",
          "Faça uma pausa no alto e desça devagar até apoiar os calcanhares."
        ],
        cues: "Suba verticalmente e mantenha pressão uniforme sobre a parte da frente dos pés.",
        mistakes: "Balançar o corpo, dobrar os joelhos ou deixar os tornozelos abrirem."
      },
      {
        id: "a-knee-pushup",
        block: 2,
        name: "Flexão com joelhos apoiados",
        muscles: "Peito, tríceps e parte anterior dos ombros",
        equipment: "Colchonete",
        bandType: "nenhum",
        sets: 2,
        target: "6–10",
        defaultReps: 6,
        perSide: false,
        posture: false,
        videoId: "yrehRkNFB_s",
        steps: [
          "Apoie mãos e joelhos, com as mãos um pouco além da largura dos ombros.",
          "Leve o corpo à frente para formar uma linha dos joelhos até a cabeça.",
          "Dobre os cotovelos em aproximadamente 45 graus e desça o peito.",
          "Empurre o chão para subir mantendo abdômen e glúteos ativos."
        ],
        cues: "Reduza a amplitude ou faça a versão na parede se não conseguir manter o corpo alinhado.",
        mistakes: "Quadril para trás, barriga caindo ou cotovelos totalmente abertos."
      },
      {
        id: "a-shoulder-press",
        block: 2,
        name: "Desenvolvimento de ombros",
        muscles: "Ombros e tríceps",
        equipment: "Elástico longo",
        bandType: "longo",
        sets: 2,
        target: "8–12",
        defaultReps: 10,
        perSide: false,
        posture: true,
        videoId: "1-VfJqjYquQ",
        steps: [
          "Pise no elástico e segure as laterais na altura dos ombros.",
          "Contraia abdômen e glúteos para evitar arquear a lombar.",
          "Empurre as mãos para cima sem elevar os ombros em direção às orelhas.",
          "Desça de forma controlada até a posição inicial."
        ],
        cues: "Mantenha as costelas encaixadas e o pescoço longo.",
        mistakes: "Arquear a lombar, prender a respiração ou usar um elástico forte demais."
      },
      {
        id: "a-reverse-lunge",
        block: 3,
        name: "Afundo reverso",
        muscles: "Quadríceps e estabilizadores do quadril",
        equipment: "Sem equipamento",
        bandType: "nenhum",
        sets: 2,
        target: "8–10 por lado",
        defaultReps: 8,
        perSide: true,
        posture: true,
        videoId: "V6GRqXghePs",
        steps: [
          "Fique em pé com os pés na largura dos quadris e o abdômen levemente firme.",
          "Dê um passo para trás e apoie a ponta do pé.",
          "Desça os dois joelhos, mantendo o tronco alto e o joelho da frente alinhado ao pé.",
          "Pressione o pé da frente para retornar e complete as repetições antes de trocar o lado."
        ],
        cues: "Mantenha a maior parte do peso na perna da frente e fixe o olhar à frente para equilibrar.",
        mistakes: "Joelho da frente entrando, passo curto demais ou impulso excessivo com a perna de trás."
      },
      {
        id: "a-triceps-kickback",
        block: 3,
        name: "Coice de tríceps com elástico",
        muscles: "Tríceps",
        equipment: "Elástico longo",
        bandType: "longo",
        sets: 2,
        target: "10–15",
        defaultReps: 12,
        perSide: false,
        posture: true,
        videoId: "v_VkdTfEPeo",
        steps: [
          "Pise no centro do elástico e segure uma lateral em cada mão.",
          "Incline o tronco a partir do quadril, mantendo coluna neutra e abdômen firme.",
          "Leve os cotovelos para trás e mantenha os braços junto ao corpo.",
          "Estenda os cotovelos levando as mãos para trás e retorne devagar."
        ],
        cues: "Mantenha os braços parados; somente os antebraços se movem.",
        mistakes: "Arredondar a coluna, balançar os braços ou deixar os ombros subirem."
      },
      {
        id: "a-dead-bug",
        block: 3,
        name: "Dead bug",
        muscles: "Abdômen e controle lombopélvico",
        equipment: "Colchonete",
        bandType: "nenhum",
        sets: 2,
        target: "8 por lado",
        defaultReps: 8,
        perSide: true,
        posture: true,
        videoId: "5c-vucY3beU",
        steps: [
          "Deite de costas com quadris e joelhos a 90 graus e braços apontando para cima.",
          "Encoste suavemente a lombar no colchonete e expire.",
          "Estenda ao mesmo tempo uma perna e o braço oposto, sem perder o contato da lombar.",
          "Volte e alterne os lados, mantendo o movimento lento."
        ],
        cues: "Use uma amplitude menor se a lombar começar a sair do colchonete.",
        mistakes: "Arquear a lombar, acelerar o movimento ou tensionar excessivamente o pescoço."
      }
    ]
  },
  B: {
    code: "B",
    title: "Puxar + cadeia posterior",
    subtitle: "Costas, bíceps, glúteos e posteriores de coxa",
    estimatedMinutes: 30,
    accent: "coral",
    exercises: [
      {
        id: "b-rdl-band",
        block: 1,
        name: "Stiff com elástico",
        muscles: "Posteriores de coxa e glúteos",
        equipment: "Elástico longo",
        bandType: "longo",
        sets: 2,
        target: "10–15",
        defaultReps: 12,
        perSide: false,
        posture: true,
        videoId: "jaRAR9l1e2o",
        steps: [
          "Pise no centro do elástico e segure as laterais com os braços estendidos.",
          "Mantenha os joelhos destravados e leve o quadril para trás.",
          "Desça até sentir alongar a parte de trás das coxas, sem arredondar a coluna.",
          "Empurre o quadril para a frente e contraia os glúteos para subir."
        ],
        cues: "O movimento vem do quadril; as canelas ficam quase verticais.",
        mistakes: "Agachar demais, curvar as costas ou hiperestender a lombar no topo."
      },
      {
        id: "b-glute-bridge",
        block: 1,
        name: "Ponte de glúteos com mini band",
        muscles: "Glúteos e posteriores de coxa",
        equipment: "Elástico curto (mini band) + colchonete",
        bandType: "curto",
        sets: 2,
        target: "12–15",
        defaultReps: 15,
        perSide: false,
        posture: true,
        videoId: "p5N_fok9YCM",
        steps: [
          "Coloque a mini band acima dos joelhos e deite com os pés apoiados no chão.",
          "Mantenha os joelhos levemente pressionados para fora.",
          "Eleve o quadril contraindo os glúteos, sem empurrar pela lombar.",
          "Faça uma pausa curta no alto e desça de forma controlada."
        ],
        cues: "Mantenha as costelas para baixo e o queixo levemente recolhido.",
        mistakes: "Abrir demais as costelas, afastar os pés em excesso ou hiperestender a lombar."
      },
      {
        id: "b-hip-abduction",
        block: 2,
        name: "Abdução de quadril deitada",
        muscles: "Glúteo médio e estabilizadores do quadril",
        equipment: "Elástico curto (mini band) + colchonete",
        bandType: "curto",
        sets: 2,
        target: "10–15 por lado",
        defaultReps: 12,
        perSide: true,
        posture: true,
        videoId: "6rWe6tLc_KM",
        steps: [
          "Coloque a mini band ao redor dos tornozelos e deite de lado com o corpo alinhado.",
          "Apoie a cabeça no braço e deixe a perna de baixo levemente dobrada para dar estabilidade.",
          "Mantenha a perna de cima estendida e eleve-a sem girar a ponta do pé para cima.",
          "Desça devagar sem perder toda a tensão e complete antes de trocar o lado."
        ],
        cues: "Mantenha o quadril empilhado e faça uma amplitude pequena e controlada.",
        mistakes: "Rolar o quadril para trás, girar o pé para cima ou usar impulso."
      },
      {
        id: "b-bent-row",
        block: 2,
        name: "Remada curvada com elástico",
        muscles: "Costas e bíceps",
        equipment: "Elástico longo",
        bandType: "longo",
        sets: 2,
        target: "10–15",
        defaultReps: 12,
        perSide: false,
        posture: true,
        videoId: "WyyMiU6Y6YM",
        steps: [
          "Pise no centro do elástico com os dois pés e segure as laterais.",
          "Incline o tronco a partir do quadril, com joelhos levemente flexionados.",
          "Puxe os cotovelos para trás, aproximando as escápulas sem encolher os ombros.",
          "Retorne devagar, mantendo o abdômen firme e a coluna neutra."
        ],
        cues: "Pense em levar os cotovelos para os bolsos de trás.",
        mistakes: "Arredondar a lombar, elevar os ombros ou usar balanço."
      },
      {
        id: "b-seated-row",
        block: 3,
        name: "Remada sentada com elástico",
        muscles: "Costas, bíceps e estabilizadores da postura",
        equipment: "Elástico longo + colchonete",
        bandType: "longo",
        sets: 2,
        target: "10–15",
        defaultReps: 12,
        perSide: false,
        posture: true,
        videoId: "bBpK36TAQww",
        steps: [
          "Sente-se com pernas estendidas ou levemente flexionadas e passe o elástico pelos pés.",
          "Segure as laterais com o peito aberto e a coluna alta.",
          "Puxe os cotovelos para trás, aproximando as escápulas.",
          "Estenda os braços devagar sem arredondar as costas."
        ],
        cues: "Mantenha os ombros longe das orelhas.",
        mistakes: "Inclinar o tronco para gerar impulso ou deixar o elástico escapar dos pés."
      },
      {
        id: "b-biceps-curl",
        block: 3,
        name: "Rosca direta com elástico",
        muscles: "Bíceps e antebraços",
        equipment: "Elástico longo",
        bandType: "longo",
        sets: 2,
        target: "10–15",
        defaultReps: 12,
        perSide: false,
        posture: true,
        videoId: "20xtfGZ37nw",
        steps: [
          "Pise no centro do elástico e segure uma lateral em cada mão.",
          "Fique alta, com abdômen firme, ombros para baixo e cotovelos junto ao tronco.",
          "Dobre os cotovelos e leve as mãos em direção aos ombros.",
          "Faça uma pausa curta no alto e desça devagar."
        ],
        cues: "Mantenha punhos neutros e cotovelos estáveis.",
        mistakes: "Balançar o tronco, encolher os ombros ou projetar os cotovelos para a frente."
      },
      {
        id: "b-reverse-crunch",
        block: 3,
        name: "Abdominal reverso",
        muscles: "Abdômen",
        equipment: "Colchonete",
        bandType: "nenhum",
        sets: 2,
        target: "10–15",
        defaultReps: 10,
        perSide: false,
        posture: true,
        videoId: "CteJ7rs2n-8",
        steps: [
          "Deite de costas, mantenha os braços ao lado do corpo e eleve as pernas com joelhos dobrados.",
          "Expire e aproxime os joelhos do peito, tirando suavemente o quadril do colchonete.",
          "Faça uma pausa curta sem apoiar o peso no pescoço ou nos ombros.",
          "Desça o quadril devagar e pare antes de perder o controle da lombar."
        ],
        cues: "Pense em enrolar a pelve; o movimento é curto e controlado.",
        mistakes: "Usar impulso das pernas, balançar o corpo ou puxar excessivamente os joelhos."
      }
    ]
  }
};

const EXERCISE_ORDER = {
  A: [
    "a-squat-miniband",
    "a-knee-pushup",
    "a-calf-raise",
    "a-shoulder-press",
    "a-reverse-lunge",
    "a-triceps-kickback",
    "a-dead-bug"
  ],
  B: [
    "b-rdl-band",
    "b-bent-row",
    "b-glute-bridge",
    "b-seated-row",
    "b-hip-abduction",
    "b-biceps-curl",
    "b-reverse-crunch"
  ]
};

Object.entries(EXERCISE_ORDER).forEach(([code, order]) => {
  WORKOUTS[code].exercises.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  WORKOUTS[code].exercises.forEach((exercise, index) => {
    exercise.block = Math.min(3, Math.floor(index / 2) + 1);
  });
});
