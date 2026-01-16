export const determineWinningRounds = (match) => {
  //console.log(match)
  let winningRounds = [];
  if(match.matchCategory == 'Single' || match.matchCategory == 'Double'){
    const playerOneId = match.playerOne.player.id;
    const playerTwoId = match.playerTwo.player.id;
    const winnerId = match.matchResult.winner.player.id;
    const playerOneScores = match.matchResult.teamOneScores;
    const playerTwoScores = match.matchResult.teamTwoScores;
    console.log(
      playerOneId,
      playerTwoId,
      winnerId,
      playerOneScores,
      playerTwoScores
    );
  
    if (playerOneId == winnerId) {
      playerOneScores.length == 2
        ? (winningRounds = [2, 0])
        : (winningRounds = [3, 1]);
    } else {
      playerTwoScores.length == 2
        ? (winningRounds = [0, 2])
        : (winningRounds = [1, 3]);
    }
  }else {
            alert('Company or University')
  }


  return winningRounds;
};
