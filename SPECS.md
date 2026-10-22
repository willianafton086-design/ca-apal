# Especificação técnica — Caça-Pal

## 1. Visão geral

O jogo é uma aplicação web responsiva de adivinhação de palavras, com uma partida diária, tema aleatório pela data, validação de tentativas e feedback visual por letra. A implementação prioriza simplicidade, performance, acessibilidade e recorrência diária.

## 2. Objetivos técnicos

- entregar a experiência em menos de 2 segundos em rede estável
- manter o fluxo em mobile-first
- usar HTML/CSS/JS vanilla para reduzir dependências
- garantir semântica acessível e contraste adequado
- persistir o progresso localmente com localStorage
- suportar teclado e interações por mouse/touch

## 3. Arquitetura

### 3.1 Estrutura de arquivos

- `index.html`: interface principal do jogo
- `mockups.html`: painel com 3 protótipos em navegador
- `styles.css`: visual do produto e dos protótipos
- `script.js`: regras do jogo, estado e persistência
- `PRD.md`: requisitos do produto
- `AGENTS.md`: instruções de documentação de PRD

### 3.2 Stack

- HTML5 semântico
- CSS moderno com responsividade
- JavaScript ES2022
- localStorage para armazenar streak e estatísticas
- servidor estático simples em Python ou Node

## 4. Fluxo de dados

### 4.1 Geração da palavra diária

A palavra do dia é determinística, baseada na data atual. A lógica deve:

- obter a data em UTC local
- converter em timestamp válido
- usar número do dia para selecionar o tema
- usar a combinaçao de tema + data para escolher a palavra

Esse padrão garante a mesma palavra para todos os usuários da mesma data sem exigir backend.

### 4.2 Estado do jogo

O estado principal é composto por:

- `answer`: palavra correta diária
- `theme`: categoria selecionada
- `guesses`: array com tentativas válidas
- `currentGuess`: tentativa em edição
- `isComplete`: jogo encerrado
- `result`: win ou loss

## 5. Componentes da interface

### 5.1 Tela inicial / hero

- nome do jogo
- tema do dia
- quantidade de letras
- instruções curtas

### 5.2 Tabuleiro

- 6 linhas por partida
- 5 células por linha
- estados: vazia, preenchida, correta, presente, ausente

### 5.3 Controles

- campo de tentativa
- botão de envio
- botão de compartilhar
- botão de reiniciar
- modal de resultado

### 5.4 Estatísticas

- streak atual
- melhor streak
- vitórias
- partidas
- % de acerto
- última palavra

## 6. Regras de negócio e lógica do jogo

- uma palavra por dia por usuário
- até 6 tentativas
- validação de 5 letras
- palavra permitida na lista do tema
- repetição de tentativa não é permitida
- feedback em tempo real
- compartilhamento sem revelar solução em casos em que a palavra não foi apresentada

## 7. Feedback visual

### Sistema de cores

- verde: letra correta na posição correta
- amarelo: letra correta em outra posição
- cinza: letra não existe na palavra

O feedback deve ser consistente visualmente e facilmente compreensível para público jovem.

## 8. Acessibilidade

- usar `aria-live` em status do jogo
- campos com rótulo acessível
- foco visível em inputs e botões
- contraste alto em textos e botões
- layout responsivo para telas pequenas
- textos curtos e linguagem simples

## 9. Persistência local

O jogo utiliza `localStorage` para salvar:

- streak atual
- melhor streak
- total de partidas
- total de vitórias
- última palavra resolvida
- precisão de acerto
- progresso diário da partida

## 10. Segurança e compatibilidade

- não há autenticação necessária no MVP
- a aplicação funciona sem backend
- compatível com navegadores modernos
- fallback suave para ausência de `navigator.share`

## 11. Manual de implementação

### Passo 1

Definir as palavras e temas de cada categoria.

### Passo 2

Construir layout principal com grid responsivo.

### Passo 3

Implementar lógica de seleção da palavra do dia.

### Passo 4

Desenvolver validação de tentativa e feedback.

### Passo 5

Persistir progresso e estatísticas.

### Passo 6

Adicionar compartilhamento e modal final.

### Passo 7

Validar acessibilidade e responsividade em mobile.

## 12. Próximos passos de evolução

- backend para autenticação leve
- mais categorias e temas
- histórico mensal
- seleção de dicionário por dificuldade
- rotas para análise de retenção

## 13. Critérios de entrega

A implementação estará concluída quando:

- a partida diária abrir e funcionar em navegador
- o feedback visual funcionar corretamente
- as estatísticas persistirem localmente
- o compartilhamento funcionar por Web Share ou cópia
- a aplicação estiver acessível em mobile e desktop
- os requisitos do PRD forem cobertos no MVP
