# PRD — Jogo casual diário de adivinhação de palavras

## 1. Pesquisa de referência e direção do produto

A categoria de jogos de adivinhação de palavras tem se consolidado por combinar esforço mínimo, feedback imediato e ritual diário. Referências como Wordle mostram que o valor principal está em três pilares:

- regra simples em menos de 10 segundos
- feedback visual claro por tentativa
- recorrência diária amplificada por streak e tema

Para o público jovem, o jogo ganha força quando combina a mecânica clássica de adivinhação com identidade visual forte, categorias divertidas e sensação de progresso. O melhor produto dessa categoria geralmente evita onboarding pesado, usa linguagem direta e entrega uma jornada de 1 a 3 minutos por rodada.

## 2. Visão geral do produto

Produto: jogo casual diário de adivinhação de palavras
Plataforma: web responsiva mobile-first
Público: crianças e jovens de 8 a 18 anos
Mecânica principal: desafio diário com palavras por tema
Estratégia: retenção diária com streak e feedback instantâneo
Monetização: sem monetização no MVP

## 3. Problema a ser resolvido

Jogos de palavras têm alto potencial de engajamento, mas muitas experiências falham por causa de:

- regras pouco claras
- onboarding pesado
- baixa clareza nas mecânicas
- baixa recorrência
- frustração por dificuldade excessiva
- ausência de ritual diário
- visual comum e pouco memorável

Este produto resolve isso com uma experiência:

- simples e acessível
- rápida de jogar
- visualmente direta
- com temas leves e amigáveis
- focada em hábito diário

## 4. Objetivo do produto

### Objetivo principal

Aumentar a recorrência diária e manter uma sequência de jogadas.

### Objetivos secundários

- tornar a experiência acessível para crianças e jovens
- ensinar palavras por tema com abordagem leve e divertida
- criar sensação de progresso sem cadastro
- gerar crescimento orgânico por compartilhamento

## 5. Público-alvo

### Público principal

- crianças e jovens
- faixa etária aproximada: 8 a 18 anos
- usam celular e tablet com frequência
- gostam de jogos rápidos e coloridos
- respondem bem a feedback visual e desafios leves

### Necessidades

- entender as regras em segundos
- gastar pouco tempo por partida
- sentir progresso
- receber retorno imediato
- manter um ritual diário sem esforço

## 6. Persona principal

### Persona 5

Nome: Persona 5

Perfil:
- gosta de jogos rápidos e coloridos
- usa o celular todos os dias
- gosta de desafios e pequenas recompensas
- se interessa por temas e novidades
- gosta de compartilhar conquistas com amigos

Necessidades:
- entender o jogo em segundos
- sentir que está melhorando
- encontrar palavras relacionadas a temas que lhe interessam
- manter uma rotina divertida no dia a dia

## 7. Proposta de valor

O produto oferece:

- uma partida por dia
- até 6 tentativas para descobrir a palavra
- feedback visual claro
- sensação de aprendizagem incremental
- ritual diário com sequência
- temas por categoria
- compartilhamento simples e leve

## 8. Core loop do jogo

1. usuário entra na tela inicial
2. visualiza a categoria e o tamanho da palavra
3. tenta adivinhar a palavra
4. recebe feedback por letra
5. ajusta a próxima tentativa
6. acerta ou esgota as tentativas
7. acompanha o resultado final
8. consulta estatísticas básicas
9. compartilha o resultado sem revelar a solução

## 9. Regras do jogo

- uma palavra por dia por usuário
- palavra escolhida automaticamente pela data
- palavra possui tamanho fixo
- o jogador tem até 6 tentativas
- a palavra pertence a uma categoria temática
- a categoria pode mudar todos os dias
- as letras recebem feedback por cor
  - verde: correta e na posição correta
  - amarelo: correta, mas em outra posição
  - cinza: não existe na palavra
- o jogo não revela a resposta antes do fim
- o compartilhamento mostra apenas o resultado, sem expor a solução

## 10. Estrutura das categorias

Temas possíveis:

- animais
- comida
- ciência
- esportes
- natureza
- objetos
- profissões
- escola
- tecnologia
- hobbies
- memes

Para o MVP, a prioridade será:

- memes e cultura pop juvenil

## 11. Funcionalidades do MVP

### 11.1 Tela inicial

- nome do jogo
- botão para iniciar
- explicação curta de como funciona
- indicação do tema do dia

### 11.2 Tela de partida

- categoria do tema
- número de letras
- campo para inserir tentativa
- feedback por tentativa
- botão de envio
- opção de voltar ao início

### 11.3 Feedback visual

- letras com status visuais
- verde: correta e na posição correta
- amarelo: correta, mas em outra posição
- cinza: ausente
- destaque claro para facilitar leitura

### 11.4 Tela de resultado

- mensagem de vitória ou derrota
- quantidade de tentativas usadas
- palavra correta revelada ao final
- botão para voltar à tela inicial ou aguardar o próximo dia

### 11.5 Estatísticas

- streak atual
- melhor streak
- total de vitórias
- total de partidas
- última palavra resolvida
- percentual de acerto

### 11.6 Compartilhamento

- botão para copiar resultado
- botão para compartilhar em redes sociais
- mensagem sem revelar a solução
- exemplo: “Acabei de jogar hoje e usei 4 tentativas!”

## 12. Requisitos funcionais

- o sistema deve gerar uma palavra do dia com base na data
- o sistema deve associar a palavra a uma categoria
- o sistema deve validar se a tentativa é uma palavra válida
- o sistema deve calcular feedback por letra
- o sistema deve limitar o número de tentativas
- o sistema deve registrar o resultado da partida
- o sistema deve manter sequência diária do usuário
- o sistema deve armazenar histórico básico de jogadas
- o sistema deve exibir estatísticas simples
- o sistema deve permitir compartilhamento do resultado
- o sistema deve funcionar em mobile e desktop responsivos
- o sistema deve aceitar entrada por teclado e teclado virtual
- o sistema deve usar palavras com nível adequado à faixa etária

## 13. Requisitos não funcionais

- interface clara e de leitura simples
- carregamento rápido
- layout responsivo
- boa legibilidade em telas pequenas
- alta acessibilidade visual
- baixo consumo de dados
- sem necessidade de cadastro obrigatório
- desempenho consistente em navegadores modernos
- suporte básico para acessibilidade visual
  - contraste adequado
  - fontes legíveis
  - botões grandes

## 14. Regras de negócio

- a palavra do dia é a mesma para todos os usuários daquela data
- a palavra deve estar no banco de palavras permitidas
- as palavras escolhidas devem atender ao tema do dia
- o usuário não pode repetir uma tentativa já feita
- palavras inválidas devem gerar aviso claro
- o sistema deve registrar a partida do dia como concluída ou não
- o sistema deve atualizar o streak quando o usuário joga e retorna no dia seguinte
- o sistema deve respeitar a lógica de “um jogo por dia” no MVP

## 15. Fluxo principal do usuário

1. abrir o jogo
2. ver a categoria e a quantidade de letras
3. inserir a primeira tentativa
4. receber feedback
5. ajustar a próxima tentativa
6. repetir até resolver
7. confirmar resultado
8. ver estatísticas
9. compartilhar

## 16. Histórias de usuário

- como jogador casual, quero entender a regra em poucos segundos para começar sem esforço
- como usuário, quero receber feedback visual por letra para saber como me aproximar da resposta
- como usuário jovem, quero ter temas divertidos para me interessar em jogar todos os dias
- como jogador, quero ver meu progresso para sentir que estou melhorando
- como usuário, quero compartilhar meu resultado sem expor a resposta para incentivar outros a jogar
- como jogador, quero continuar minha sequência diária para manter o hábito

## 17. Critérios de aceitação

- a tela inicial deve carregar em menos de 2 segundos em rede estável
- o tutorial deve caber em até 2 frases curtas
- o jogo deve permitir ao menos 6 tentativas
- a palavra deve ser validada antes de confirmar
- o feedback deve ser exibido imediatamente após a tentativa
- o resultado deve aparecer sem atraso
- o sistema deve manter o streak do usuário em base diária
- o resultado compartilhado não deve revelar a solução
- a experiência deve funcionar em celular com largura pequena

## 18. Métricas de sucesso

### Principais

- retenção em 1 dia
- retenção em 3 dias
- retenção em 7 dias
- taxa de conclusão da partida
- taxa de vitória
- média de tentativas por partida
- tempo médio de sessão
- streak médio
- número de compartilhamentos
- taxa de retorno no dia seguinte

### Qualidade

- taxa de tentativa inválida
- taxa de abandono na primeira tela
- taxa de erro de entendimento da mecânica
- tempo até a primeira jogada

## 19. Riscos e desafios

- palavras muito difíceis para a faixa etária
- excesso de frustração em alguns temas
- baixa retenção se o ritual diário não ficar claro
- pouca variedade se as categorias forem reduzidas demais
- compartilhamento sem engajamento real
- dificuldade de destacar o jogo em um mercado competitivo

## 20. Escopo do MVP

O MVP deve incluir:

- palavra do dia
- categoria temática
- até 6 tentativas
- feedback por letras
- tela de resultado
- streak simples
- estatísticas básicas
- compartilhamento
- layout mobile-first
- sem cadastro obrigatório
- sem monetização

## 21. O que não entra no MVP

- ranking global
- multiplayer
- compras internas
- assinatura
- sistema de avatar avançado
- temas muito complexos
- tutorial longo
- sistema de recompensas pesado

## 22. Roadmap sugerido

### MVP

- palavra do dia por tema
- feedback por letras
- streak diário
- estatísticas básicas
- compartilhamento simples

### Próxima fase

- mais categorias
- mais palavras por tema
- dificuldade personalizada
- histórico detalhado
- desafios semanais
- elementos sociais leves

## 23. Definição final do produto

Produto: jogo casual diário de adivinhação de palavras para público jovem, com temas divertidos e ritual diário, pensado para web mobile-first, sem monetização no MVP, com foco em retenção orgânica.

## 24. Conclusão

Este PRD estabelece uma base sólida para o desenvolvimento do jogo, priorizando simplicidade, aprendizado leve, feedback visual claro e recorrência diária. O MVP é focado em oferecer uma experiência acessível e habit-forming, com grande potencial de expansão em futuras versões.

## 25. Decisão de direção visual

A interface seguirá uma linguagem retrô 70s/80s, combinando cores quentes e saturadas, contraste de arcade, bordas mais geométricas e detalhes gráficos inspirados em telas de jogo da época. O título permanece visível, mas sem uma faixa de cabeçalho; o tabuleiro e o campo de palavra mantêm prioridade e legibilidade em telas pequenas.
