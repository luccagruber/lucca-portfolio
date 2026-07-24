import type { ProjectReport } from "../types";
import { GRUBER_PLATFORM_URL, acculIdentity, gruberIdentity } from "./identity";

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
          text: "Uma extensão do Chrome que deixa um projeto continuar em qualquer IA, exatamente de onde parou. Primeira versão funcionando: 15 de junho de 2026. Cinco semanas depois já tinha backend próprio, armazenamento criptografado, oito idiomas e um monitor que me avisa quando quebra.",
        },
        {
          kind: "meta",
          rows: [
            { term: "O que é", detail: "Extensão do Chrome + backend e armazenamento criptografado meus" },
            { term: "Funciona em", detail: "Claude · ChatGPT · Gemini · DeepSeek" },
            { term: "Situação", detail: "Enviada para a Chrome Web Store, aguardando aprovação" },
          ],
        },
      ],
    },
    {
      id: "problem",
      label: "O PROBLEMA",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Você trabalha dentro de um chat de IA e alguma coisa valiosa vai se acumulando: decisões, tentativas que falharam, o próximo passo exato. Troca de IA — ou só abre um chat novo — e sumiu. Você explica tudo de novo, toda vez.",
            "Claude e Gemini lançaram exportação de memória no começo de 2026, o que prova que a demanda existe. Só que o que eles levam é quem você é — não o que você estava construindo.",
          ],
        },
        {
          kind: "lede",
          text: "Ninguém tinha construído a coisa de verdade. Então eu construí.",
        },
      ],
    },
    {
      id: "capture",
      label: "A PARTE DIFÍCIL",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Nenhuma das quatro plataformas oferece um jeito de ler o que acontece dentro delas. Cada uma teve que ser reconstruída por engenharia reversa — e cada turno da conversa é capturado de três formas independentes ao mesmo tempo:",
          ],
        },
        {
          kind: "numbered",
          items: [
            {
              title: "Interceptação de rede",
              body: "Envolve a própria camada de rede da página e remonta a resposta completa da IA a partir do formato de streaming privado de cada plataforma.",
            },
            {
              title: "Internals do React",
              body: "Lê o estado das mensagens direto da árvore de componentes do React em memória — e pega o instante exato em que a resposta termina.",
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
            "O primeiro método que der certo salva o turno. Se os três falharem, um alerta com um código de erro específico chega no meu celular em dez segundos — porque as plataformas mudam sem avisar, e uma coisa que falha em silêncio é pior do que uma coisa que não existe.",
            "As conversas das pessoas são sensíveis, então o sistema foi feito de um jeito que nem eu consigo lê-las. Cada snapshot é criptografado antes de ser guardado; a chave existe só no meu servidor — uma máquina Linux que eu mesmo administro, rodando sozinha a um custo perto de zero.",
          ],
        },
        {
          kind: "figures",
          items: [
            {
              src: "/images/projects/accul-continue.webp",
              alt: "Accul Reburg continuando um projeto em outra IA",
              caption: "Continuando um projeto em outra IA — três cliques",
            },
            {
              src: "/images/projects/accul-onboarding.webp",
              alt: "Termos de privacidade da Accul Reburg na primeira execução",
              caption: "Primeira execução — o que é processado, o que é guardado, o que você controla",
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
            { term: "11 de julho", detail: "Armazenamento passa para o dispositivo; o prompt do snapshot é escrito" },
            { term: "21 de julho", detail: "Chave de API por usuário eliminada — os snapshots agora passam pelo meu servidor, criptografados" },
            { term: "22 de julho", detail: "Oito idiomas, limite de requisições e um monitor que testa a extensão contra ela mesma" },
            { term: "23 de julho", detail: "Enviada para revisão" },
          ],
        },
        {
          kind: "paragraphs",
          items: [
            "A maior parte do que mudou nessas semanas não foi código. Foi o que eu achava que o produto era.",
            "Dei a extensão para uma pessoa que comparou com copiar e colar — e aí disse que era muito mais rápido que copiar e colar, e que pegava coisas que copiar e colar não pega. Também disse que o preço era alto para onde ele mora, e me mandou parar de vender continuidade. Ele estava certo. O que a extensão guarda de verdade é o estado do trabalho: as decisões, as restrições, o próximo passo. E isso vale alguma coisa em todo lugar onde hoje esse estado não consegue viajar — entre ferramentas, entre agentes, entre duas pessoas passando um projeto adiante.",
            "A segunda lição foi sobre mim. Numa manhã o meu próprio projeto não estava lá na extensão, e eu quase abandonei o meu próprio produto antes de qualquer outra pessoa. Quase tudo que foi construído depois disso — os três métodos de captura, os alertas, o monitor que se testa sozinho — existe por causa daquela manhã.",
          ],
        },
        {
          kind: "status",
          text: "Enviada para a Chrome Web Store — aguardando aprovação",
          note: "A ideia, a arquitetura, as decisões de produto e a infraestrutura: tudo meu. Código construído com apoio de IA.",
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
      label: "PARTE III — OS NÚMEROS",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Uma loja que você não consegue tocar tem que rodar em cima de alguma coisa, então construí a plataforma que segura o negócio inteiro: produtos, compras, vendas, estoque, precificação.",
            "O motor de precificação mapeia cada faixa de taxa dos dois marketplaces — comissões, percentuais por categoria, faixas de peso — e devolve o ponto de equilíbrio exato e o lucro real para qualquer preço. Essa foi a parte que valeu aprender: o número que eu tratava como lucro não era lucro. O negócio vazava margem num lugar que ficava invisível até ser calculado. A maioria dos vendedores pequenos chuta essa conta; boa parte deles está perdendo dinheiro no produto que mais vende e não sabe.",
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
