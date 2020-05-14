# tetris.ai
Genetic algorithm to play and master a Tetris clone: https://rbehal.github.io/tetris.ai/

Demo after 13 generations:

![Demo after 13 generations:](https://media.giphy.com/media/XfautQQW6oQgO27RGh/giphy.gif)

# Architecture

## Generations and Genomes
tetris.ai uses a single layer perceptron model to judge the quality of a given move. The weights are stored in an object I'll refer to as a genome. The genetic algorithm begins by initializing a generation of size 50. This generation includes 50 genomes that have randomly initialized weights. The genomes play games 1 by 1 consecutively. When a game ends, the next genome in the generation begins a game until every genome in the generation has played one game. After the entire generation has finished, a new generation of 50 is produced through crossbreeding and mutation.

## Crossbreeding
After the entire generation is finished, the top 10% of performing genomes (by score) are used as a pool of parents to create the next generation. There is a 50/50 chance that the child will have a given parent's gene, i.e one weight in the genome. 

## Mutation
After the crossbreeding, there is a 5% chance that a gene will be mutated in a random way. 

## Features
The features are key indicators that were selected after careful research and trial and error. The features include the number of lines cleared, the absolute height of the game, the roughness, the number of "holes", etc. 

# References 

..*[UTexas MM-NEAT](http://nn.cs.utexas.edu/?mm-neat)
..*[Evolution of AI in Tetris Play Using Raw Screen Inputs](https://people.southwestern.edu/~schrum2/SCOPE/SCOPE-Poster-Tetris.pdf)
..*[Playing Tetris with Genetic Algorithms](http://cs229.stanford.edu/proj2015/238_poster.pdf)
..*[TetNet](https://idreesinc.com/about-tetnet.html)


