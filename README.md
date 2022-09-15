# Litoshow Macro Importer

Script feito para importar e exportar macros do [Litoshow](https://marketplace.visualstudio.com/items?itemName=FernandoPalacios.litoshow).

## 💻 Como instalar

- Faça o clone, entre na pasta do projeto e instale as dependências e o CLI `lito-macro`

```shell
git clone https://github.com/jonathan-f-silva/litoshow-macro-importer.git
cd litoshow-macro-importer
npm install
npm link
```

## 💻 Para usar

⚠️ Feche todas as janelas no VSCode antes de importar e exportar! ⚠️

> Caso não seja passados parâmetros, os comandos tentam usar um arquivo `macros.json` local.
>
> É possível passar um caminho para uma DB SQLite do VSCode (.vscdb) como segundo parâmetro como alvo da importação/exportação.

- Para exportar as macros do seu VSCode em um arquivo JSON

> ⚠️ NOTA: a exportação sobre-escreve completamente o arquivo .json especificado! ⚠️

```shell
lito-show export macros.json
```

- Para importar um JSON com macros exportadas para seu VSCode

> NOTA: a importação adiciona novas macros no VSCode

```shell
lito-show import macros.json
```
