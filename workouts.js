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
    title: "Força + postura",
    subtitle: "Agachar, puxar, fortalecer braços e estabilizar",
    estimatedMinutes: 30,
    accent: "violet",
    exercises: [
      {
        id: "a-squat-miniband",
        block: 1,
        name: "Agachamento com mini band",
        muscles: "Quadríceps, glúteos e core",
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
          "Leve o quadril para trás como se fosse sentar, mantendo o peito aberto.",
          "Empurre levemente os joelhos para fora, alinhados aos pés.",
          "Suba pressionando o chão e contraindo os glúteos, sem travar os joelhos."
        ],
        cues: "Peso distribuído no pé inteiro; coluna neutra; movimento controlado.",
        mistakes: "Joelhos caindo para dentro, calcanhares levantando ou lombar arredondada."
      },
      {
        id: "a-bent-row",
        block: 1,
        name: "Remada curvada com elástico",
        muscles: "Costas, bíceps e estabilizadores da postura",
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
        mistakes: "Arredondar a lombar, elevar os ombros ou transformar o movimento em balanço."
      },
      {
        id: "a-biceps-curl",
        block: 2,
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
          "Pise no centro do elástico com os pés na largura dos quadris e segure uma lateral em cada mão.",
          "Fique alta, com abdômen firme, ombros para baixo e cotovelos próximos ao tronco.",
          "Dobre os cotovelos e leve as mãos em direção aos ombros, sem movimentar os braços para a frente.",
          "Faça uma pausa curta no alto e desça devagar até quase estender os cotovelos."
        ],
        cues: "Mantenha punhos neutros e cotovelos estáveis; ajuste a tensão afastando ou aproximando os pés.",
        mistakes: "Balançar o tronco, encolher os ombros, dobrar os punhos ou projetar os cotovelos para a frente."
      },
      {
        id: "a-rdl-band",
        block: 2,
        name: "Stiff com elástico",
        muscles: "Posteriores de coxa, glúteos e costas",
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
        id: "a-shoulder-press",
        block: 3,
        name: "Desenvolvimento de ombros",
        muscles: "Ombros, tríceps e core",
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
        cues: "Costelas encaixadas e pescoço longo.",
        mistakes: "Arquear a lombar, prender a respiração ou usar um elástico forte demais."
      },
      {
        id: "a-dead-bug",
        block: 3,
        name: "Dead bug",
        muscles: "Core profundo e controle lombopélvico",
        equipment: "Colchonete",
        bandType: "nenhum",
        sets: 2,
        target: "8 por lado",
        defaultReps: 8,
        perSide: true,
        posture: true,
        videoId: "uQfzuKBMJeE",
        steps: [
          "Deite de costas com quadris e joelhos a 90 graus e braços apontando para cima.",
          "Encoste suavemente a lombar no colchonete e expire.",
          "Estenda ao mesmo tempo uma perna e o braço oposto, sem perder o contato da lombar.",
          "Volte e alterne os lados, mantendo o movimento lento."
        ],
        cues: "Amplitude menor é melhor do que perder o controle da lombar.",
        mistakes: "Arquear a lombar, acelerar ou tensionar excessivamente o pescoço."
      }
    ]
  },
  B: {
    code: "B",
    title: "Unilateral + postura",
    subtitle: "Pernas, glúteos, costas, braços e estabilidade",
    estimatedMinutes: 30,
    accent: "coral",
    exercises: [
      {
        id: "b-reverse-lunge",
        block: 1,
        name: "Afundo reverso com apoio",
        muscles: "Quadríceps, glúteos e equilíbrio",
        equipment: "Parede para apoio opcional",
        bandType: "nenhum",
        sets: 2,
        target: "8–10 por lado",
        defaultReps: 8,
        perSide: true,
        posture: true,
        videoId: "UcU2i5G790s",
        steps: [
          "Fique em pé ao lado da parede e use uma mão apenas para equilíbrio.",
          "Dê um passo para trás e apoie a ponta do pé.",
          "Desça os dois joelhos, mantendo o tronco alto e o joelho da frente alinhado ao pé.",
          "Pressione o pé da frente para retornar e complete as repetições antes de trocar o lado."
        ],
        cues: "Passo para trás suficientemente longo para manter estabilidade.",
        mistakes: "Joelho da frente entrando, tronco despencando ou impulso excessivo."
      },
      {
        id: "b-seated-row",
        block: 1,
        name: "Remada sentada com elástico",
        muscles: "Costas, bíceps e postura",
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
        id: "b-glute-bridge",
        block: 2,
        name: "Ponte de glúteos com mini band",
        muscles: "Glúteos, posteriores e core",
        equipment: "Elástico curto (mini band) + colchonete",
        bandType: "curto",
        sets: 2,
        target: "12–15",
        defaultReps: 15,
        perSide: false,
        posture: true,
        videoId: "le8ZN02BQCE",
        steps: [
          "Coloque a mini band acima dos joelhos e deite com pés apoiados no chão.",
          "Mantenha os joelhos levemente pressionados para fora.",
          "Eleve o quadril contraindo os glúteos, sem empurrar pela lombar.",
          "Faça uma pausa curta no alto e desça de forma controlada."
        ],
        cues: "Costelas para baixo e queixo levemente recolhido.",
        mistakes: "Abrir demais as costelas, afastar os pés em excesso ou hiperestender a lombar."
      },
      {
        id: "b-knee-pushup",
        block: 2,
        name: "Flexão com joelhos apoiados",
        muscles: "Peito, tríceps, ombros e core",
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
        id: "b-triceps-kickback",
        block: 3,
        name: "Coice de tríceps com elástico",
        muscles: "Tríceps e estabilizadores das escápulas",
        equipment: "Elástico longo",
        bandType: "longo",
        sets: 2,
        target: "10–15",
        defaultReps: 12,
        perSide: false,
        posture: true,
        videoUrl: "https://inspirefulwomen.com/exercises/womens-resistance-band-triceps-kickback-exercise-foot-anchored-proper-form/",
        steps: [
          "Pise no centro do elástico com os dois pés e segure uma lateral em cada mão.",
          "Incline o tronco a partir do quadril, mantendo coluna neutra, abdômen firme e joelhos destravados.",
          "Leve os cotovelos para trás e mantenha os braços junto ao corpo, com os cotovelos dobrados.",
          "Estenda os cotovelos levando as mãos para trás; retorne devagar sem mover os braços para cima ou para baixo."
        ],
        cues: "O cotovelo funciona como uma dobradiça: o braço permanece parado e somente o antebraço se move.",
        mistakes: "Arredondar a coluna, balançar os braços, abrir os cotovelos ou deixar os ombros subirem."
      },
      {
        id: "b-bird-dog",
        block: 3,
        name: "Bird dog",
        muscles: "Core, glúteos, lombar e estabilidade dos ombros",
        equipment: "Colchonete",
        bandType: "nenhum",
        sets: 2,
        target: "8 por lado",
        defaultReps: 8,
        perSide: true,
        posture: true,
        videoId: "5qilsXG8ufc",
        steps: [
          "Fique em quatro apoios com mãos sob os ombros e joelhos sob os quadris.",
          "Contraia o abdômen sem prender a respiração.",
          "Estenda um braço e a perna oposta sem girar o quadril.",
          "Faça uma pausa, retorne com controle e alterne os lados."
        ],
        cues: "Imagine um copo apoiado nas costas que não pode derramar.",
        mistakes: "Girar o quadril, elevar demais a perna ou arquear a lombar."
      }
    ]
  }
};
