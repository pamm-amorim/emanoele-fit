export const WARMUP = {
  duration: 180,
  items: [
    "Marcha no lugar — 45 s",
    "Círculos de ombros — 30 s",
    "Gato-vaca no colchonete — 30 s",
    "Encaixe de quadril sem carga — 45 s",
    "Agachamento curto sem elástico — 30 s"
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
        videoId: "emkI_9zB9LQ",
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
        videoUrl: "https://www.acefitness.org/resources/everyone/exercise-library/body-part/legs-calves-and-shins/",
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
        videoId: "rsbq8DwZEGg",
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
        videoId: "oZ4gQrJonb8",
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
        name: "Afundo reverso com apoio",
        muscles: "Quadríceps e estabilizadores do quadril",
        equipment: "Parede ou cadeira para apoio opcional",
        bandType: "nenhum",
        sets: 2,
        target: "8–10 por lado",
        defaultReps: 8,
        perSide: true,
        posture: true,
        videoId: "UcU2i5G790s",
        steps: [
          "Fique em pé ao lado de uma parede ou cadeira e use uma mão apenas para equilíbrio.",
          "Dê um passo para trás e apoie a ponta do pé.",
          "Desça os dois joelhos, mantendo o tronco alto e o joelho da frente alinhado ao pé.",
          "Pressione o pé da frente para retornar e complete as repetições antes de trocar o lado."
        ],
        cues: "Mantenha a maior parte do peso na perna da frente e use o apoio somente para equilíbrio.",
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
        videoUrl: "https://inspirefulwomen.com/exercises/womens-resistance-band-triceps-kickback-exercise-foot-anchored-proper-form/",
        steps: [
          "Pise no centro do elástico e segure uma lateral em cada mão.",
          "Incline o tronco a partir do quadril, mantendo coluna neutra e abdômen firme.",
          "Leve os cotovelos para trás e mantenha os braços junto ao corpo.",
          "Estenda os cotovelos levando as mãos para trás e retorne devagar."
        ],
        cues: "Mantenha os braços parados; somente os antebraços se movem.",
        mistakes: "Arredondar a coluna, balançar os braços ou deixar os ombros subirem."
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
        videoId: "OGXUuxv627g",
        videoStart: 480,
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
        videoId: "le8ZN02BQCE",
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
        name: "Abdução de quadril em pé",
        muscles: "Glúteo médio e estabilizadores do quadril",
        equipment: "Elástico curto (mini band) + cadeira",
        bandType: "curto",
        sets: 2,
        target: "10–15 por lado",
        defaultReps: 12,
        perSide: true,
        posture: true,
        videoUrl: "https://www.acefitness.org/getfit/rubrbndwkout.pdf",
        steps: [
          "Coloque a mini band ao redor dos tornozelos e apoie as mãos no encosto de uma cadeira.",
          "Deixe o peso em uma perna, mantendo joelho e tronco estáveis.",
          "Leve a outra perna para o lado sem girar a ponta do pé para fora.",
          "Retorne devagar sem perder toda a tensão e complete antes de trocar o lado."
        ],
        cues: "Faça uma amplitude pequena e mantenha quadris e ombros apontados para a frente.",
        mistakes: "Inclinar o tronco, girar o pé para fora ou usar impulso."
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
        videoId: "kjc7U5eMaB0",
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
        videoId: "j9KCjIBCG8k",
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
        videoUrl: "https://inspirefulwomen.com/exercises/womens-resistance-band-biceps-curl-arm-exercise-proper-form/",
        steps: [
          "Pise no centro do elástico e segure uma lateral em cada mão.",
          "Fique alta, com abdômen firme, ombros para baixo e cotovelos junto ao tronco.",
          "Dobre os cotovelos e leve as mãos em direção aos ombros.",
          "Faça uma pausa curta no alto e desça devagar."
        ],
        cues: "Mantenha punhos neutros e cotovelos estáveis.",
        mistakes: "Balançar o tronco, encolher os ombros ou projetar os cotovelos para a frente."
      }
    ]
  }
};
