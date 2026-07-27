import type { ProjectReport } from "../types";
import { ACCUL_STORE_URL, GRUBER_PLATFORM_URL, acculIdentity, gruberIdentity } from "./identity";

/**
 * The two project files in Brazilian Portuguese — a translation of `en.ts`,
 * page for page. Same rules: one linear story, short pages, dates from the
 * real git history, and the lesson rather than the feature.
 *
 * Two things are handled differently here than in the other languages,
 * because the reader changes: Shopee and Mercado Livre need no explanation
 * to a Brazilian (the English file glosses them), and "R$"/marketplace
 * vocabulary is used as a seller would actually say it.
 */

const acculReburg: ProjectReport = {
  id: "accul-reburg",
  name: "Accul Reburg",
  fileLabel: "ACCUL REBURG",
  identity: acculIdentity,
  pages: [
    {
      id: "cover",
      label: "ARQUIVO DO PROJETO",
      blocks: [
        { kind: "logo", src: "/images/projects/accul-logo.webp", alt: "Logo da Accul Reburg" },
        { kind: "kicker", text: "Memória portátil para conversas com IA" },
        { kind: "title", text: "Accul Reburg" },
        {
          kind: "lede",
          text: "Você trabalha dentro de um chat de IA e alguma coisa valiosa vai se acumulando: decisões, tentativas que falharam, o próximo passo exato. Troca de IA — ou só abre um chat novo — e sumiu. Você explica tudo de novo, toda vez.",
        },
        {
          kind: "link",
          label: "Instalar pela Chrome Web Store",
          href: ACCUL_STORE_URL,
        },
        {
          kind: "status",
          text: "No ar na Chrome Web Store — Claude, ChatGPT, Gemini e DeepSeek, em oito idiomas",
          note: "A ideia, a arquitetura, as decisões de produto e a infraestrutura: tudo meu. Código construído com apoio de IA.",
        },
      ],
    },
    {
      id: "capture",
      label: "PRIVACIDADE E A PARTE DIFÍCIL",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "O trabalho inacabado de alguém é sobre a coisa mais privada que existe, então a extensão guarda o mínimo possível dele. Cada projeto vive no dispositivo do próprio usuário: sem conta, sem cadastro, com um botão de exportar que devolve tudo e um botão de apagar que apaga de verdade.",
            "A única coisa que sai do navegador é o turno que está sendo resumido. Ele passa por um servidor que eu mesmo construí e administro — uma máquina Linux rodando sozinha a um custo perto de zero — que guarda a chave da IA e não armazena nada.",
            "Conseguir esse turno é a parte difícil. Nenhuma das quatro plataformas oferece um jeito de ler o que acontece dentro delas, então cada uma teve que ser destrinchada por engenharia reversa — e cada turno é capturado de três formas independentes ao mesmo tempo:",
          ],
        },
        {
          kind: "numbered",
          items: [
            {
              title: "Interceptação de rede",
              body: "Envolve a própria camada de rede da página e remonta a resposta a partir do formato de streaming privado de cada plataforma.",
            },
            {
              title: "Internals do React",
              body: "Lê o estado das mensagens direto da árvore de componentes do React em memória, e pega o instante em que a resposta termina.",
            },
            {
              title: "Observação do DOM",
              body: "Acompanha a conversa na tela, usando o sinal de conclusão da própria plataforma como deixa.",
            },
          ],
        },
        {
          kind: "paragraphs",
          items: [
            "O primeiro método que der certo salva o turno. Se os três falharem, um alerta com um código de erro específico chega no meu celular em dez segundos — as plataformas mudam sem avisar, e uma coisa que falha em silêncio é pior do que uma coisa que não existe.",
          ],
        },
        {
          kind: "figures",
          items: [
            {
              src: "/images/projects/accul-data.webp",
              alt: "Controles de exportar, importar e apagar tudo da Accul Reburg",
              caption: "Seus projetos, no seu dispositivo — exportar ou apagar, quando quiser",
            },
            {
              src: "/images/projects/accul-continue.webp",
              alt: "Accul Reburg continuando um projeto em outra IA",
              caption: "Continuando um projeto em outra IA — três cliques",
            },
          ],
        },
      ],
    },
    {
      id: "learned",
      label: "CINCO SEMANAS",
      blocks: [
        {
          kind: "meta",
          rows: [
            { term: "15 de junho", detail: "Primeira versão funcionando — captura e restauração, nas quatro plataformas" },
            { term: "28 de junho", detail: "Captura e telemetria de erros refeitas do zero, depois que a primeira falhou em silêncio" },
            { term: "11 de julho", detail: "Reconstruída: fora a nuvem e as contas, cada projeto vai para o dispositivo do usuário" },
            { term: "21 de julho", detail: "A chave de IA por usuário também cai — quem guarda é o meu servidor, então funciona ao instalar" },
            { term: "22 de julho", detail: "Oito idiomas, limite de requisições e um monitor que testa a extensão contra ela mesma" },
            { term: "23 de julho", detail: "Enviada para revisão" },
            { term: "27 de julho", detail: "No ar na Chrome Web Store" },
          ],
        },
        {
          kind: "paragraphs",
          items: [
            "A maior parte do que mudou nessas semanas não foi código — foi o que eu achava que o produto era. No primeiro mês isso era um produto na nuvem: uma conta, e cada snapshot criptografado em repouso no meu banco. Funcionava, e mesmo assim era o formato errado, porque a resposta honesta para segurar o trabalho inacabado de alguém nunca foi criptografar melhor, era não segurar. O resto eu aprendi numa única manhã, quando o meu próprio projeto não estava lá na minha própria extensão e eu quase abandonei tudo antes de qualquer outra pessoa: os três métodos de captura, os alertas e o monitor que se testa sozinho existem por causa daquela manhã.",
          ],
        },
      ],
    },
  ],
};

const gruberGoal: ProjectReport = {
  id: "gruber-goal",
  name: "Gruber Goal",
  fileLabel: "GRUBER GOAL",
  identity: gruberIdentity,
  pages: [
    {
      id: "cover",
      label: "ARQUIVO DO PROJETO",
      blocks: [
        { kind: "logo", src: "/images/projects/gg-logo.webp", alt: "Logo da Gruber Goal" },
        { kind: "kicker", text: "Um negócio de verdade, tocado entre dois continentes" },
        { kind: "title", text: "Gruber Goal" },
        {
          kind: "lede",
          text: "Uma marca de material de goleiro que fundei no Brasil em janeiro de 2025. Quando me mudei para a Holanda, eu não fechei — reconstruí para rodar sem mim lá.",
        },
        {
          kind: "meta",
          rows: [
            { term: "Tipo", detail: "Varejo de produto físico — luvas e material de goleiro" },
            { term: "Vende na", detail: "Shopee e Mercado Livre" },
            { term: "Operado de", detail: "Haia, Holanda" },
            { term: "Situação", detail: "Operando" },
          ],
        },
      ],
    },
    {
      id: "brazil",
      label: "PARTE I — BRASIL",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Janeiro de 2025: primeiro estoque comprado. Em volta dele construí tudo que uma marca precisa — a identidade, a loja virtual e um canal no TikTok de conteúdo de goleiro que chegou a 2.300 seguidores e 55 mil curtidas, puxando clientes para a loja.",
            "Pedidos reais, clientes reais, avaliações cinco estrelas: “Chegou tudo perfeito — vou mandar o site para os meus amigos goleiros.”",
          ],
        },
        {
          kind: "figures",
          items: [
            {
              src: "/images/projects/gg-website.webp",
              alt: "A loja virtual da Gruber Goal no celular",
              caption: "A loja — marca, textos e campanhas, tudo meu",
            },
            {
              src: "/images/projects/gg-tiktok.webp",
              alt: "O perfil da Gruber Goal no TikTok",
              caption: "@grubergoal — 55 mil curtidas de conteúdo de goleiro",
            },
          ],
        },
      ],
    },
    {
      id: "move",
      label: "PARTE II — A MUDANÇA",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Dezembro de 2025: me mudei para a Holanda — um oceano de distância do meu próprio estoque. O negócio não fechou. Ele mudou de forma.",
            "Cortei tudo que exigia a minha presença física — o site, o conteúdo diário — e levei as vendas para a Shopee e o Mercado Livre, onde o brasileiro já compra. A família no Brasil embala e envia. Todo o resto roda da minha mesa em Haia.",
          ],
        },
      ],
    },
    {
      id: "platform",
      label: "PARTE III — A PLATAFORMA",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Uma loja que você não consegue tocar tem que rodar em cima de alguma coisa, então essa coisa eu construí — uma plataforma feita sob medida para a minha operação, e não para a de outra pessoa: produtos, compras, vendas, estoque e a precificação que me diz o que eu ganho de verdade.",
          ],
        },
        {
          kind: "link",
          label: "Abrir uma cópia da plataforma",
          href: GRUBER_PLATFORM_URL,
        },
        {
          kind: "figures",
          items: [
            {
              src: "/images/projects/gg-glove.webp",
              alt: "Luva de goleiro profissional da Gruber Goal",
              caption: "O produto — luvas de goleiro profissionais",
            },
          ],
        },
        {
          kind: "status",
          text: "Operando — estoque antigo saindo, estoque novo chegando",
        },
      ],
    },
  ],
};

export const pt: readonly ProjectReport[] = [acculReburg, gruberGoal];
