$(function(){
    var showModal = function(el){
        el = $(el);
        if(el.length){
            el.addClass('show');
        }
    };

    var hideModal = function(el){
        el = $(el);
        if(el.length){
            el.removeClass('show');
        }
    };

    var _parseInt = function(num){
        num = parseInt(num);
        if(isNaN(num)) num = 0;
        return num;
    };

    var _parseFloat = function(num){
        num = parseFloat(num);
        if(isNaN(num)) num = 0;
        return num;
    };

    var shuffle = function(arra1){
        var length = arra1.length, temp, index;
        while(length > 0){
            index = Math.floor(Math.random() * length);
            length--;
            temp = arra1[length];
            arra1[length] = arra1[index];
            arra1[index] = temp;
        }
        return arra1;
    };

    var clone = function(obj){
        return JSON.parse(JSON.stringify(obj ?? null));
    };

    var positionSubmittedTableCards = function(){
        let players = [0,1,2,3];
        let centerTable = $('.submit-table');
        let centerArea = centerTable.get(0).getBoundingClientRect();
        for(let player of players){
            let playerTable = $(`.player-area[data-no="${player}"] .player-area-table`);
            let cards = $(`.player-area[data-no="${player}"] .player-area-table-cell.turn-to-board:not(.withdrawn-from-board):not(.returned-to-winner)`);
            let cardWidth = cards.first().width();
            let cardHeight = cards.first().height();
            let playerTableArea = playerTable.get(0).getBoundingClientRect();
            if(player == 0 || player == 2){
                let lefts = [];
                let top = 0;
                if(player == 0){
                    top = ((playerTableArea.top - centerArea.bottom) + (cardHeight * 1)) * (-1);
                }
                else{
                    top = ((centerArea.top - playerTableArea.top) + (cardHeight * 0)) * (1);
                }
                if(cards.length == 3){
                    lefts = [0,0,0];
                    lefts[1] = (centerArea.left - playerTableArea.left) + ((centerArea.width/2) - (cardWidth/2));
                    lefts[0] = lefts[1] - cardWidth - 5;
                    lefts[2] = lefts[1] + cardWidth + 5;
                }
                if(cards.length == 4){
                    lefts = [0,0,0,0];
                    lefts[1] = (centerArea.left - playerTableArea.left) + ((centerArea.width/2) - (cardWidth)) - 2;
                    lefts[0] = lefts[1] - cardWidth - 4;
                    lefts[2] = lefts[1] + cardWidth + 4;
                    lefts[3] = lefts[2] + cardWidth + 4;
                }
                cards.each(function(){
                    let el = $(this);
                    let serial = _parseInt(el.attr('data-card-serial'));
                    el.addClass('turned-to-board').css({left:`${lefts[serial]}px`, top:`${top}px`});
                });
            }
            else{
                let lefts = [];
                let top = 0;
                top = ((centerArea.top - playerTableArea.top) + (centerArea.width/2) - (cardHeight/2)) * (1);
                if(cards.length == 3){
                    lefts = [0,0,0];
                    if(player == 1){
                        lefts[1] = (centerArea.left - playerTableArea.left) - (cardWidth/2);
                        lefts[0] = lefts[1] - cardWidth - 5;
                        lefts[2] = lefts[1] + cardWidth + 5;
                    }
                    else{
                        lefts[1] = (centerArea.right - playerTableArea.left) - (cardWidth/2);
                        lefts[0] = lefts[1] - cardWidth - 5;
                        lefts[2] = lefts[1] + cardWidth + 5;
                    }
                }
                if(cards.length == 4){
                    lefts = [0,0,0,0];
                    let tempCardWidth = cardWidth * .75;
                    if(player == 1){
                        lefts[1] = (centerArea.left - playerTableArea.left) - (cardWidth/2) - 2;
                        lefts[0] = lefts[1] - tempCardWidth - 4;
                        lefts[2] = lefts[1] + tempCardWidth + 4;
                        lefts[3] = lefts[2] + tempCardWidth + 4;
                    }
                    else{
                        lefts[2] = (centerArea.right - playerTableArea.left) - (cardWidth/2) - 2;
                        lefts[1] = lefts[2] - tempCardWidth - 4;
                        lefts[0] = lefts[1] - tempCardWidth - 4;
                        lefts[3] = lefts[2] + tempCardWidth + 4;
                    }
                }
                cards.each(function(){
                    let el = $(this);
                    let serial = _parseInt(el.attr('data-card-serial'));
                    el.addClass('turned-to-board').css({left:`${lefts[serial]}px`, top:`${top}px`});
                });
            }
        }
    };

    var positionWonTableCards = function(){
        let cards = $(`.player-area-table-cell.return-to-winner:not(.returned-to-winner)`);
        cards.each(function(){
            let el = $(this);
            let cardWidth = el.width();
            let cardHeight = el.height();
            let owner = _parseInt(el.attr('data-card-owner'));
            let winner = _parseInt(el.attr('data-card-winner'));
            let from = $(`.player-area[data-no="${owner}"] .player-area-table`);
            let fromArea = from.get(0).getBoundingClientRect();
            let to = $(`.player-area[data-no="${winner}"] .player-area-table`);
            let toArea = to.get(0).getBoundingClientRect();
            let top = 0, left = 0;
            if(owner == 0){
                top = (fromArea.top - (toArea.top + (toArea.height/2)) + (cardHeight/2)) * (-1);
                left = (fromArea.left - (toArea.left + (toArea.width/2)) + (cardWidth/2)) * (-1);
            }
            else if(owner == 1){
                top = (fromArea.top - (toArea.top + (toArea.height/2)) - (cardHeight/2) + cardHeight) * (-1);
                left = ((toArea.left + (toArea.width/2) - fromArea.left) - (cardWidth/2));
            }
            else if(owner == 2){
                top = ((toArea.top + (toArea.height/2) - fromArea.top) - (cardHeight/2));
                left = (fromArea.left - (toArea.left + (toArea.width/2)) - (cardWidth/2) + cardWidth) * (-1);
            }
            else if(owner == 3){
                top = (fromArea.top - (toArea.top + (toArea.height/2)) - (cardHeight/2) + cardHeight) * (-1);
                left = ((toArea.left + (toArea.width/2) - fromArea.left) - (cardWidth/2));
            }
            el.addClass('returned-to-winner').css({left: `${left}px`, top: `${top}px`});
        });
    };

    var gameNumber = 0;

    var initGame = function(){
        
        var pointTable = [], 
            pointEmptyRow = {0:0, 1:0, 2:0, 3:0}, 
            totalPoints = {0:0, 1:0, 2:0, 3:0}, 
            server = 0, 
            gameOver = false, 
            reviewPreviousRound = false,
            frequency = .05, 
            serverInterval = frequency * 15, 
            waitAfterSubRound = frequency * 60, 
            waitAfterRound = frequency * 10; // seconds

        var setResult = function(){
            let table = $('.result-table');
            let tbody = ``;
            let tfoot =  ``;
            for(let item of pointTable){
                tbody += `<tr>
                    <td>${item[0]}</td>
                    <td>${item[1]}</td>
                    <td>${item[2]}</td>
                    <td>${item[3]}</td>
                </tr>`;
            }
            tfoot += `<tr>
                <th>${totalPoints[0]}</th>
                <th>${totalPoints[1]}</th>
                <th>${totalPoints[2]}</th>
                <th>${totalPoints[3]}</th>
            </tr>`;
            if(Math.max(...(Object.values(totalPoints))) > 1000){
                gameOver = true;
            }
            if(gameOver){
                tfoot += `<tr><th class="game-over-row" colspan="4">Game Over</th></tr>`;
            }
            table.find('tbody').html(tbody);
            table.find('tfoot').html(tfoot);
        };

        setResult();

        var gameRound = function(opts){
            gameNumber++;

            opts = $.extend({
                server: 0,
            }, opts);

            var currentPlayingCards = null,
                ownInitialCards = ``,
                finalPlayingCards = {},
                currentBatchNo = 0,
                roundEnded = false,
                roundTotalPoints = {0:0, 1:0, 2:0, 3:0},
                reviewCardsAll = {},
                cardNumbers = `A-K-Q-J-W-9-8-7-6-5-4-3-2`.split('-'),
                cardTypes = 'H-S-D-C'.split('-'), // heart, spades, diamond, club
                typeWeights = {},
                numberWeights = {},
                playingCards = [];

            var levels = {
                tri: 6,
                colorSequence: 5,
                sequence: 4,
                color: 3,
                pair: 2,
                high: 1,
                rest: 0,
            };

            /*
                these methods are used to manage card sets 
            */
            var cardSerialize = function(cards){
                let str = [];
                for(let item of cards){
                    str.push(`${item.number}${item.type}`);
                }
                return str.join(' ').trim();
            }

            var cardUnserialize = function (str){
                let cards = [];
                let _cards = str.trim().split(' ');
                for(let item of _cards){
                    let temp = item.trim().split('');
                    cards.push({
                        type: temp[1],
                        number: temp[0],
                        weight: numberWeights[temp[0]],
                        typeWeight: typeWeights[temp[1]],
                    });
                }
                return cards;
            };

            var sortCardSet = function(cards, byType){
                byType = byType ?? false;
                return cards.sort(function(a,b){
                    if(byType){
                        if(a.typeWeight == b.typeWeight){
                            return b.weight - a.weight;
                        }
                        return b.typeWeight - a.typeWeight;
                    }
                    else{
                        if(a.weight == b.weight){
                            return b.typeWeight - a.typeWeight;
                        }
                        return b.weight - a.weight;
                    }
                });
            };

            var sortResultSet = function(cards){
                for(let item of cards){
                    item = sortCardSet(item);
                }
                return cards.sort(function(a,b){
                    return b[0].weight - a[0].weight;
                })
            };

            var sortFinalResultSet = function(cards){
                return cards.sort(function(a,b){
                    if(b.level == a.level){
                        return b.weight - a.weight;
                    }
                    return b.level - a.level;
                })
            };

            var findCard = function(cards, number){
                for(let [i, v] of cards.entries()){
                    if(v.number === number){
                        return {
                            index: i,
                            value: clone(v),
                        }
                    }
                }
                return null;
            };

            var concatCards = function(cards){
                let temp = ``;
                for(let item of cards){
                    temp += item.number;
                }
                return temp;
            };

            /*
                these methods are used to generate cards
            */
            var initCards = function(){
                playingCards = [];
                let j = 4;
                for(let type of cardTypes){
                    typeWeights[type] = j;
                    let i = 13;
                    for(let item of cardNumbers){
                        numberWeights[item] = i;
                        playingCards.push({
                            type: type,
                            number: item,
                            weight: i,
                            typeWeight: j,
                        });
                        i--;
                    }
                    j--;
                }
            };

            var fnCardsByPlayer = function(){
                var cardsByPlayer = {
                    0: [],
                    1: [],
                    2: [],
                    3: []
                };
                var cards = shuffle(clone(playingCards));
                let current = 0;
                for(let i = 0; i < 4; i++){
                    for(let j = 0; j < 13; j++){
                        cardsByPlayer[i][j] = cards[current];
                        current++;
                    }
                }
                return cardsByPlayer;
            };

            var findSuffleError = function(cards){
                let countByKey = {};
                for(let item of cardNumbers){
                    countByKey[item] = 0;
                }
                for(let item of cards){
                    countByKey[item.number]++;
                }
                let pairCount = 0;
                for(let x in countByKey){
                    if(countByKey.hasOwnProperty(x)){
                        if(countByKey[x] > 1){
                            pairCount++;
                        }
                    }
                }
                if(pairCount >= 5){
                    return true;
                }

                return false;
            };

            var generateCards = function(){
                let tried = 10, cards = null;
                while(tried){
                    let _cards = fnCardsByPlayer();
                    let error = false;
                    for(let x in _cards){
                        if(_cards.hasOwnProperty(x)){
                            let _error = findSuffleError(_cards[x]);
                            if(_error){
                                error = true;
                                break;
                            }
                        }
                    }
                    if(!error){
                        cards = _cards;
                        break;
                    }
                    tried--;
                }
                return cards;
            }

            /*
                these methods are used to show cards properly in UI
            */
            var setCardIntoTable = function(no, blank){
                no = no ?? 0;
                blank = blank ?? false;
                cards = currentPlayingCards[no];
                let area = $('.player-area[data-no="'+no+'"] .player-area-table-wrapper');
                let table = area.find('.player-area-table');
                if(!table.length){
                    area.append('<div class="player-area-table"></div>');
                }
                table = area.find('.player-area-table');
                if(table.length){
                    if(no > 0){
                        table.attr('data-empty', 'true');
                    }
                    let wrapper = area.closest('.player-area');
                    let cells = ``;
                    let i = 0;
                    for(let item of cards){
                        let _number = item.number == 'W' ? '10' : item.number;
                        if(blank){
                            //  data-symbol="${item.number}${item.type}"
                            cells += `<div class="player-area-table-cell">
                                <div class="player-area-table-card-wrapper">
                                    <div class="cardback">
                                        <div class="cardback-child">
                                        </div>
                                    </div>
                                    <div class="player-area-table-card-holder">
                                        <span class="number number-top"></span>
                                        <span class="number number-bottom"></span>
                                        <span class="type">
                                            <span class="line line-1"></span>
                                            <span class="line line-2"></span>
                                            <span class="line line-3"></span>
                                            <span class="line line-4"></span>
                                        </span>
                                        <span class="type type-2">
                                            <span class="line line-1"></span>
                                            <span class="line line-2"></span>
                                            <span class="line line-3"></span>
                                            <span class="line line-4"></span>
                                        </span>
                                        <span class="type type-3">
                                            <span class="line line-1"></span>
                                            <span class="line line-2"></span>
                                            <span class="line line-3"></span>
                                            <span class="line line-4"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>`;
                        }
                        else {
                            cells += `<div class="player-area-table-cell" data-no="${i}" data-card-type="${item.type}" data-card-number="${item.number}" data-card-weight="${item.weight}">
                                        <div class="player-area-table-card-wrapper">
                                            <div class="cardback">
                                                <div class="cardback-child">
                                                </div>
                                            </div>
                                            <div class="player-area-table-card-holder" data-card-type="${item.type}" data-card-number="${item.number}" data-card-weight="${item.weight}">
                                                <span class="number number-top">${_number}</span>
                                                <span class="number number-bottom">${_number}</span>
                                                <span class="type">
                                                    <span class="line line-1"></span>
                                                    <span class="line line-2"></span>
                                                    <span class="line line-3"></span>
                                                    <span class="line line-4"></span>
                                                </span>
                                                <span class="type type-2">
                                                    <span class="line line-1"></span>
                                                    <span class="line line-2"></span>
                                                    <span class="line line-3"></span>
                                                    <span class="line line-4"></span>
                                                </span>
                                                <span class="type type-3">
                                                    <span class="line line-1"></span>
                                                    <span class="line line-2"></span>
                                                    <span class="line line-3"></span>
                                                    <span class="line line-4"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>`;
                        }
                        i++;
                    }
                    table.html(cells);
                    setCardPositions(no);
                    if(no == 0){
                        let axis = 'x';
                        if(wrapper.hasClass('vertical-list')){
                            axis = 'y';
                        }
                        table.sortable({
                            axis: axis,
                            containment: '#app',
                            start: function(e, ui){
                                ui.item.addClass('sorting-element');
                                setCardPositions(no)
                            },
                            sort: function(e, ui){
                                setCardPositions(no)
                            },
                            stop: function(e, ui){
                                let leftInPercent = (ui.position.left / ui.item.parent().width()) * 100;
                                ui.item.css({left:`${leftInPercent}%`})
                                setTimeout(function(){
                                    ui.item.removeClass('sorting-element');
                                    setCardPositions(no)
                                }, 100)
                            },
                        });
                    }
                    setTimeout(() => {
                        table.attr('data-empty', blank ? 'true' : 'false');
                    }, serverInterval);
                }
            }

            var setCardPositions = function(no){
                no = no ?? 0;
                setTimeout(function(){
                    let area = $('.player-area[data-no="'+no+'"] .player-area-table-wrapper .player-area-table');
                    if(area.length){
                        let wrapper = area.closest('.player-area');
                        var left = 0;
                        var width = 100 / 13;
                        area.find('>.player-area-table-cell:not(.ui-sortable-helper)').each(function(){
                            let el = $(this);
                            if(wrapper.hasClass('vertical-list')){
                                el.css({top:`${left}%`, left:`0px`});
                            }
                            else{
                                el.css({ top:`0px`, left:`${left}%`});
                            }
                            left += width;
                        })
                    }
                }, 0);
            };

            var reorderCardDoms = function(no){
                no = no ?? 0;
                let area = $('.player-area[data-no="'+no+'"] .player-area-table-wrapper .player-area-table');
                if(area.length){
                    for(let i = 12; i >= 0; i--){
                        let card = currentPlayingCards[no][i];
                        let cardDom = area.find(`>.player-area-table-cell[data-card-type="${card.type}"][data-card-weight="${card.weight}"]:not(.ui-sortable-helper)`);
                        if(cardDom.length){
                            area.prepend(cardDom);
                        }
                    }
                }
            };

            var prepareCardTable = function(){
                currentPlayingCards = generateCards();
                // currentPlayingCards[0] = cardUnserialize(sampleSet6);
                ownInitialCards = cardSerialize(sortCardSet(clone(currentPlayingCards[0])));
                // console.log(`${cardSerialize(currentPlayingCards[0])},${cardSerialize(currentPlayingCards[1])},${cardSerialize(currentPlayingCards[2])},${cardSerialize(currentPlayingCards[3])}`);
                setCardIntoTable(0);
                setCardIntoTable(1, true);
                setCardIntoTable(2, true);
                setCardIntoTable(3, true);
            };

            /*
                these methods are used to help auto play after player arranges this cards
            */
            var getNextPlayer = function(currentPlayer){
                if(currentPlayer == 3){
                    return 0;
                }
                return currentPlayer + 1;
            };

            var pointSum = function(cardBatch){
                let cards = [];
                for(let item of cardBatch){
                    if(item.rest){
                        cards = [...cards, ...item.rest.result];
                    }
                    cards = [...cards, ...item.result.result];
                }
                return cards.reduce((p, v, i) => {
                    return p + (v.weight > 8 ? 10 : 5);
                }, 0);
            }

            var showResult = function(){
                pointTable.push(roundTotalPoints);
                server = getNextPlayer(server);
                roundEnded = true;
                setResult();
                $('body').addClass('round-ended').removeClass('round-started round-running');
                let modal = $('.result-modal');
                showModal(modal);
            };

            var finalizeOwnCard = function(){
                let finalResult = null;
                let cardStr = [];
                $('.player-area[data-no="0"] .player-area-table-cell').each(function(){
                    let el = $(this);
                    cardStr.push(`${el.attr('data-card-number')}${el.attr('data-card-type')}`)
                });
                let cards = cardUnserialize(cardStr.join(' '));
                let verifyCards = cardSerialize(sortCardSet(clone(cards)));
                let verified = verifyCards == ownInitialCards;
                if(verified){
                    reviewCardsAll[0] = clone(cards);
                    let chunks = [];
                    for(let i = 0; i < 3; i++){
                        chunks.push(cards.splice(0,3));
                    }
                    chunks.push(cards);
                    let result = [];
                    for(let item of chunks){
                        let temp = getBestResult(item);
                        result = [...result, ...temp];
                    }
                    result = sortFinalResultSet(result);
                    while(true){
                        let lastSet = [...result[3].result, ...result[4].result];
                        let lastResult = getBestResult(lastSet);
                        if(lastResult[0].level > result[2].level || (lastResult[0].level == result[2].level && lastResult[0].weight > result[2].weight)){
                            result[3] = lastResult[0];
                            result[4] = lastResult[1];
                            result = sortFinalResultSet(result);
                        }
                        else{
                            break;
                        }
                    }
                    let newCards = [];
                    for(let item of result){
                        newCards = [...newCards, ...item.result];
                    }
                    finalResult = result;
                }
                else{
                    alert('Sorry, it seems cards were tempered');
                }
                return finalResult;
            }

            var compareCards = function(cardBatch){
                if(currentBatchNo == 4){
                    cardBatch.sort(function(a, b){
                        if(b.result.level == a.result.level){
                            if(b.result.weight == a.result.weight){
                                if(b.rest.result[0].weight == a.rest.result[0].weight){
                                    return b.no - a.no;
                                }
                                return b.rest.result[0].weight - a.rest.result[0].weight;
                            }
                            return b.result.weight - a.result.weight;
                        }
                        return b.result.level - a.result.level;
                    });
                }
                else{
                    cardBatch.sort(function(a, b){
                        if(b.result.level == a.result.level){
                            if(b.result.weight == a.result.weight){
                                return b.no - a.no;
                            }
                            return b.result.weight - a.result.weight;
                        }
                        return b.result.level - a.result.level;
                    });
                }
                
                return cardBatch;
            };

            var removeCardsFromSubmitTable = function(winnerPlayer, comparedBatch){
                for(let [i, cardSet] of comparedBatch.entries()){
                    var playerArea = $(`.player-area[data-no="${cardSet.player}"]`);
                    if(playerArea.length){
                        let cards = [];
                        for(let item of cardSet.result.result){
                            cards.push(playerArea.find(`.player-area-table-cell[data-card-type="${item.type}"][data-card-weight="${item.weight}"]`));
                        }
                        if(cardSet.rest){
                            for(let item of cardSet.rest.result){
                                cards.push(playerArea.find(`.player-area-table-cell[data-card-type="${item.type}"][data-card-weight="${item.weight}"]`));
                            }
                        }
                        for(let [i2, v2] of cards.entries()){
                            v2.attr('data-card-owner', cardSet.player);
                            v2.attr('data-card-winner', winnerPlayer);
                            v2.attr('data-has-won', i == 0 ? 1 : 0);
                            v2.attr('data-batch-no', currentBatchNo);
                            v2.find('.batch-no').remove();
                            v2.find('.player-area-table-card-holder').append(`<span class="batch-no">${currentBatchNo}</span>`);
                            v2.addClass('return-to-winner');
                        }
                    }
                }
                positionWonTableCards();
            };

            var cardSendToBoard = function(cardSet){
                var centerTable = $('.submit-table');
                var playerArea = $(`.player-area[data-no="${cardSet.player}"]`);
                if(playerArea.length && centerTable.length){
                    let cards = [];
                    for(let item of cardSet.result.result){
                        cards.push(playerArea.find(`.player-area-table-cell[data-card-type="${item.type}"][data-card-weight="${item.weight}"]`));
                    }
                    if(cardSet.rest){
                        for(let item of cardSet.rest.result){
                            cards.push(playerArea.find(`.player-area-table-cell[data-card-type="${item.type}"][data-card-weight="${item.weight}"]`));
                        }
                    }
                    for(let [i, v] of cards.entries()){
                        v.attr('data-card-serial', i);
                        v.addClass('turn-to-board');
                    }
                }
                positionSubmittedTableCards();
            };

            var pickCardBatch = function(){
                let firstPlayer = server;
                currentBatchNo++;
                let players = [];
                let no = firstPlayer;
                for(let i = 0; i < 4; i++){
                    players.push(no);
                    no++;
                    if(no > 3){
                        no = 0;
                    }
                }
                let currentSendBatch = [];
                let i = 0;
                for(let player of players){
                    let currentSend = {
                        no: i,
                        player: player,
                        result: finalPlayingCards[player][currentBatchNo-1],
                        rest: currentBatchNo == 4 ? finalPlayingCards[player][4] : null,
                    };
                    currentSendBatch.push(currentSend);
                    i++;
                }
                let comparedBatch = compareCards(clone(currentSendBatch));
                let winnerPlayer = comparedBatch[0].player;
                server = winnerPlayer;
                let sum = pointSum(comparedBatch);
                let pointRow = clone(pointEmptyRow);
                pointRow[winnerPlayer] = sum;
                totalPoints[winnerPlayer] += sum;
                roundTotalPoints[winnerPlayer] += sum;
                setTimeout(() => {
                    cardSendToBoard(currentSendBatch[0]);
                    setTimeout(() => {
                        cardSendToBoard(currentSendBatch[1]);
                        setTimeout(() => {
                            cardSendToBoard(currentSendBatch[2]);
                            setTimeout(() => {
                                cardSendToBoard(currentSendBatch[3]);
                                setTimeout(() => {
                                    removeCardsFromSubmitTable(winnerPlayer, comparedBatch);
                                    setTimeout(() => {
                                        if(currentBatchNo == 4){
                                            showResult();
                                        }
                                        else{
                                            pickCardBatch();
                                        }
                                    }, waitAfterRound * 1000);
                                }, waitAfterSubRound * 1000);
                            }, serverInterval * 1000);
                            
                        }, serverInterval * 1000);
                    }, serverInterval * 1000);
                }, serverInterval * 1000);
                return currentSendBatch;
            }

            /*
                these methods are used to compute best card results from a card set
            */
            var getTries = function(cards){
                var output = {
                    result: {},
                    rest: [],
                    magicCards: {},
                };
                var groupByNumbers = {};
                for(let item of cards){
                    if(typeof groupByNumbers[item.number] === "undefined"){
                        groupByNumbers[item.number] = {
                            number: item.number,
                            count: 0,
                            weight: item.weight,
                            set: []
                        };
                    }
                    groupByNumbers[item.number].count++;
                    groupByNumbers[item.number].set.push(item);
                }
                var groupByNumbersValue = Object.values(groupByNumbers);
                groupByNumbersValue.sort(function(a,b){
                    if(b.count == a.count){
                        return b.weight - a.weight;
                    }
                    return b.count - a.count
                })
                for(let item of groupByNumbersValue){
                    if(item.count >= 3){
                        output.result[item.number] = item;
                        if(item.count > 3){
                            for(let i = 0; i < item.count - 3; i++){
                                output.rest.push({
                                    type: 'A',
                                    number: item.number,
                                    weight: item.weight,
                                    typeWeight: 0,
                                });
                                output.magicCards[item.number] = item;
                            }
                        }
                    }
                    else{
                        for(let item2 of item.set){
                            output.rest.push(item2);
                        }
                    }
                }
                let _result = [];
                for(let x in output.result){
                    if(output.result.hasOwnProperty(x)){
                        let tempResult = {
                            level: levels.tri,
                            of: output.result[x].set[0].number,
                            weight: output.result[x].set[0].weight,
                            result: output.result[x].set,
                        };
                        _result.push(tempResult);
                    }
                }
                _result.sort(function(a, b){
                    return b.result[0].weight - a.result[0].weight;
                });
                output.result = _result;
                return output;
            };

            var getColorSequences = function(cards){
                var output = {
                    result: [],
                    rest: []
                };
                let groupByType = {};
                let magicCards = {};
                for(let item of cards){
                    if(item.type == 'A'){
                        magicCards[item.number] = item;
                        continue;
                    }
                    if(typeof groupByType[item.type] === "undefined"){
                        groupByType[item.type] = [];
                    }
                    groupByType[item.type].push(item);
                }
                var removeFromMagicCards = function(cards){
                    for(let item of cards){
                        if(item.type == 'A'){
                            delete magicCards[item.number];
                        }
                    }
                };
                for(let x in groupByType){
                    if(groupByType.hasOwnProperty(x)){
                        if(groupByType[x].length >= 3){
                            if(Object.keys(magicCards).length){
                                let tempMagicCards = Object.values(magicCards);
                                for(let item of tempMagicCards){
                                    item.for = x;
                                }
                                groupByType[x].push(...(tempMagicCards));
                            }
                            groupByType[x] = sortCardSet(groupByType[x]);
                            if(groupByType[x][0].number == 'A'){
                                if(
                                    groupByType[x][1].number + groupByType[x][2].number !== 'KQ' &&
                                    groupByType[x][groupByType[x].length-2].number + groupByType[x][groupByType[x].length-1].number === '32'
                                ){
                                    let tempResult = [
                                        groupByType[x][0],
                                        groupByType[x][groupByType[x].length-2],
                                        groupByType[x][groupByType[x].length-1],
                                    ];
                                    output.result.push(tempResult);
                                    groupByType[x].splice(0, 1);
                                    groupByType[x].splice(-2);
                                    removeFromMagicCards(tempResult);
                                }
                                if(groupByType[x].length < 3){
                                    output.rest = [...output.rest, ...groupByType[x]];
                                    continue;
                                }
                            }
                            
                            let temp = [];
                            for(let i = 0; i < groupByType[x].length; i++){
                                if(!temp.length || temp[temp.length-1].weight == groupByType[x][i].weight + 1){
                                    temp.push(groupByType[x][i]);
                                }
                                else{
                                    output.rest = [...output.rest, ...temp];
                                    temp = [];
                                    temp.push(groupByType[x][i]);
                                }
                                if(temp.length == 3){
                                    output.result.push(temp);
                                    removeFromMagicCards(temp);
                                    temp = [];
                                }
                            }
                            if(temp.length != 3){
                                output.rest = [...output.rest, ...temp];
                            }
                        }
                        else{
                            output.rest = [...output.rest, ...groupByType[x]];
                        }
                    }
                }
                let _rest = [];
                for(let item of output.rest){
                    if(item.type !== "A"){
                        _rest.push(item);
                    }
                };
                for(let x in magicCards){
                    if(magicCards.hasOwnProperty(x)){
                        _rest.push(magicCards[x]);
                    }
                }
                output.rest = _rest;
                output.result = sortResultSet(output.result);
                let _result = [];
                if(output.result.length){
                    for(let item of output.result){
                        let tempResult = {
                            level: levels.colorSequence,
                            of: item[0]?.for ?? item[0].type,
                            weight: item[0].weight + (`${item[0].number}${item[1].number}` == "AK" ? 1 : 0),
                            result: item
                        }
                        _result.push(tempResult);
                    }
                }
                output.result = _result;
                return output;
            };

            var getSequences = function(output){
                let result = [];
                let rest = [];
                if(typeof output !== "undefined"){
                    if(typeof output.rest === "undefined"){
                        cards = output;
                    }
                    else{
                        cards = output.rest;
                    }
                    result = output.result ?? [];
                    cards = sortCardSet(cards);
                    let temp = [];
                    for(let i = 0; i < cards.length; i++){
                        if(temp.length == 3){
                            rest.push(cards[i]);
                            continue;
                        }
                        if(!temp.length || temp[temp.length-1].weight == cards[i].weight + 1){
                            temp.push(cards[i]);
                        }
                        else if(temp[temp.length-1].weight == cards[i].weight){
                            rest.push(cards[i]);
                        }
                        else{
                            rest = [...rest, ...temp];
                            temp = [];
                            temp.push(cards[i]);
                        }
                    }
                    if(temp.length == 3){
                        result.push(temp);
                        return getSequences({
                            result: result,
                            rest: rest
                        });
                    }
                    else{
                        rest = [...rest, ...temp];
                    }
                }
                result = sortResultSet(result);
                rest = sortCardSet(rest);
                if(result.length && rest.length){
                    if(concatCards(result[0]) === 'AKQ'){
                        let find2 = findCard(rest, '2');
                        let find3 = findCard(rest, '3');
                        let findJ = findCard(rest, 'J');
                        if(findJ && find2 && find3){
                            let temp = clone(result[0][0]);
                            result[0][0] = findJ.value;
                            result.push([
                                temp,
                                find3.value,
                                find2.value
                            ])
                            let tempRest = [];
                            for(let [i, v] of rest.entries()){
                                if(i == find2.index || i == find3.index || i == findJ.index){
                                    continue;
                                }
                                tempRest.push(v);
                            }
                            rest = tempRest;
                        }
                    }
                    else if(rest[0].number === 'A'){
                        if(concatCards(result[result.length - 1]) === '432'){
                            let temp1 = clone(rest[0]);
                            let temp2 = clone(result[result.length - 1][0]);
                            rest[0] = temp2;
                            result[result.length - 1][0] = temp1;
                        }
                        else{
                            let find2 = findCard(rest, '2');
                            let find3 = findCard(rest, '3');
                            if(find2 && find3){
                                let temp = [
                                    clone(rest[0]),
                                    clone(rest[find3.index]),
                                    clone(rest[find2.index]),
                                ];
                                result.push(temp);
                                let tempRest = [];
                                for(let [i, v] of rest.entries()){
                                    if(i == 0 || i == find2.index || i == find3.index){
                                        continue;
                                    }
                                    tempRest.push(v);
                                }
                                rest = tempRest;
                            }
                        }
                        
                    }
                }

                while(rest.length >= 3){
                    let findA = findCard(rest, 'A');
                    let find2 = findCard(rest, '2');
                    let find3 = findCard(rest, '3');
                    if(findA && find2 && find3){
                        let temp = [
                            clone(rest[findA.index]),
                            clone(rest[find3.index]),
                            clone(rest[find2.index]),
                        ];
                        result.push(temp);
                        let tempRest = [];
                        for(let [i, v] of rest.entries()){
                            if(i == findA.index || i == find2.index || i == find3.index){
                                continue;
                            }
                            tempRest.push(v);
                        }
                        rest = tempRest;
                    }
                    else{
                        break;
                    }
                }

                let response = bestPossibleSpareCardsAfterSequnce({
                    result: result,
                    rest: rest
                });
                response.result = sortResultSet(response.result);
                let _result = [];
                if(response.result.length){
                    for(let item of response.result){
                        let tempResult = {
                            level: levels.sequence,
                            of: null,
                            weight: item[0].weight + (`${item[0].number}${item[1].number}` == "AK" ? 1 : 0),
                            result: item
                        }
                        _result.push(tempResult);
                    }
                }
                response.result = _result;
                return response;
            };

            var bestPossibleSpareCardsAfterSequnce = function(output){
                let result = [...(output.result ?? [])];
                let rest = [...(output.rest ?? [])];
                rest = sortCardSet(rest);
                let restGroupByType = {}, magicCards = [];
                for(let item of rest){
                    if(item.type === "A"){
                        magicCards.push(item);
                        continue;
                    }
                    if(typeof restGroupByType[item.type] === "undefined"){
                        restGroupByType[item.type] = [];
                    }
                    restGroupByType[item.type].push(item);
                }
                let newResult = [], newRest = [];
                for(let x in restGroupByType){
                    if(restGroupByType.hasOwnProperty(x)){
                        if(restGroupByType[x].length >= 3){
                            newResult = [...newResult, ...(restGroupByType[x].splice(0, 3))];
                            if(!restGroupByType[x].length){
                                delete restGroupByType[x];
                            }
                            else{
                                newRest = [...newRest, ...(restGroupByType[x])];
                            }
                        }
                        else{
                            newRest = [...newRest, ...(restGroupByType[x])];
                        }
                    }
                }
                if(newRest.length >= 3){
                    for(let item of cardTypes){
                        for(let [i, v] of newRest.entries()){
                            if(v.type != item){
                                for(let [i2, v2] of result.entries()){
                                    for(let [i3, v3] of v2.entries()){
                                        if(v3.number == v.number && v3.type == item){
                                            let temp1 = clone(v3);
                                            let temp2 = clone(v);
                                            newRest[i] = temp1;
                                            result[i2][i3] = temp2;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                return {
                    result: result,
                    rest: [...newResult, ...newRest, ...magicCards]
                }
            };

            var getColors = function(output){
                let result = [];
                let rest = [];
                if(typeof output !== "undefined"){
                    if(typeof output.rest === "undefined"){
                        cards = output;
                    }
                    else{
                        cards = output.rest;
                    }
                    result = output.result ?? [];
                    cards = sortCardSet(cards, true);
                    let groupByType = {}, magicCards = {};
                    for(let item of cards){
                        if(item.type === "A"){
                            magicCards[item.number] = item;
                            continue;
                        }
                        if(typeof groupByType[item.type] === "undefined"){
                            groupByType[item.type] = [];
                        }
                        groupByType[item.type].push(item);
                    }
                    let magicCardsValues = Object.values(magicCards);
                    magicCardsValues = sortCardSet(magicCardsValues);
                    let groupByTypeValues = Object.values(groupByType);
                    for(let [i, item] of groupByTypeValues.entries()){
                        if(item.length >= 3){
                            let tempRest = [];
                            let chunkCount = Math.floor(item.length/3);
                            if(chunkCount * 3 < item.length){
                                tempRest = item.splice((chunkCount * 3) - item.length);
                            }
                            let groups = [];
                            for(let i = 0; i < chunkCount; i++){
                                groups[i] = [];
                                groups[i].push(...(item.splice(0, 1)));
                                groups[i].push(...(item.splice(-2)));
                            }
                            result = [...result, ...groups];
                            groupByTypeValues[i] = [...item, ...tempRest];
                        }
                    }
                    for(let [i, item] of groupByTypeValues.entries()){
                        if(item.length == 2 && magicCardsValues.length){
                            magicCardsValues[0].for = item[0].type;
                            result.push([...item, magicCardsValues[0]]);
                            let temp = magicCardsValues.splice(0, 1);
                            delete magicCards[temp[0].number];
                        }
                        else if(item.length == 1 && magicCardsValues.length >= 2){
                            magicCardsValues[0].for = item[0].type;
                            magicCardsValues[1].for = item[0].type;
                            result.push([...item, magicCardsValues[0], magicCardsValues[1]]);
                            let temp = magicCardsValues.splice(0, 2);
                            delete magicCards[temp[0].number];
                            delete magicCards[temp[1].number];
                        }
                        else{
                            rest = [...rest, ...item];
                            groupByTypeValues[i] = [];
                        }
                    }
                    if(magicCardsValues.length >= 3){
                        let temp = magicCardsValues.splice(0, 3);
                        for(let item of temp){
                            delete magicCards[item.number];
                            item.for = 'H';
                        }
                        result.push(temp);
                    }
                    rest = [...rest, ...magicCardsValues];
                }
                let response = {
                    result: sortResultSet(result),
                    rest: rest
                };

                let _result = [];
                if(response.result.length){
                    for(let item of response.result){
                        let tempResult = {
                            level: levels.color,
                            of: item[0]?.for ?? item[0].type,
                            weight: _parseInt(`${(`0`+item[0].weight).slice(-2)}${(`0`+item[1].weight).slice(-2)}${(`0`+item[2].weight).slice(-2)}`),
                            result: item
                        }
                        _result.push(tempResult);
                    }
                }
                response.result = _result;

                return response;
            };

            var getPairs = function (output){
                let result = [];
                let rest = [];
                let maxSet = 0;
                if(typeof output !== "undefined"){
                    if(typeof output.rest === "undefined"){
                        cards = output;
                    }
                    else{
                        cards = output.rest;
                    }
                    maxSet = Math.floor(cards.length/3);
                    result = output.result ?? [];
                    let groupByNumber = {};
                    for(let item of cards){
                        if(typeof groupByNumber[item.number] === "undefined"){
                            groupByNumber[item.number] = [];
                        }
                        groupByNumber[item.number].push(item);
                    }
                    let groupByNumberValues = Object.values(groupByNumber);
                    groupByNumberValues.sort(function(a ,b){
                        return b[0].weight - a[0].weight
                    });
                    for(let _item of groupByNumberValues){
                        let item = clone(_item);
                        if(item.length >= 2){
                            let chunkCount = Math.floor(item.length/2);
                            if(chunkCount * 3 < item.length){
                                let tempRest = item.splice((chunkCount * 3) - item.length);
                                rest = [...rest, ...tempRest];
                            }
                            let groups = [];
                            for(let i = 0; i < chunkCount; i++){
                                groups[i] = [];
                                groups[i].push(...(item.splice(0, 2)));
                            }
                            result = [...result, ...groups];
                        }
                        else{
                            rest = [...rest, ...item];
                        }
                    }
                }
                result = sortResultSet(result);
                if(result.length > maxSet){
                    let extraResults = result.splice(maxSet - result.length);
                    for(let item of extraResults){
                        rest = [...rest, ...item];
                    }
                }
                rest = sortCardSet(rest);
                for(let item of result){
                    if(rest.length){
                        if(rest.length == 2){
                            item.push((rest.splice(0, 1))[0]);
                        }
                        else{
                            item.push((rest.splice(-1))[0]);
                        }
                    }
                }
                let response = {
                    result: result,
                    rest: rest
                };

                let _result = [];
                if(response.result.length){
                    for(let item of response.result){
                        let tempResult = {
                            level: levels.pair,
                            of: item[0]?.for ?? item[0].number,
                            weight: _parseFloat(`${item[0].weight}.${item[2].weight}`),
                            result: item
                        }
                        _result.push(tempResult);
                    }
                }
                response.result = _result;

                return response;
            };

            var getHighCards = function(cards){
                cards = sortCardSet(cards);
                let result = [], rest = [];
                let chunkCount = Math.floor(cards.length/3);
                if(chunkCount * 3 < cards.length){
                    let tempRest = cards.splice((chunkCount * 3) - cards.length);
                    rest = [...rest, ...tempRest];
                }
                for(let i = 0; i < chunkCount; i++){
                    result[i] = [];
                    result[i].push(...(cards.splice(0, 1)));
                    result[i].push(...(cards.splice(-2)));
                }
                let response =  {
                    result: sortResultSet(result),
                    rest: rest
                }

                let _result = [];
                if(response.result.length){
                    for(let item of response.result){
                        let tempResult = {
                            level: levels.high,
                            of: null,
                            weight: _parseInt(`${(`0`+item[0].weight).slice(-2)}${(`0`+item[1].weight).slice(-2)}${(`0`+item[2].weight).slice(-2)}`),
                            result: item
                        }
                        _result.push(tempResult);
                    }
                }
                response.result = _result;

                return response;
            };

            var getBestResult = function(cards){
                let result = [];
                let triResult = getTries(cards);
                if(triResult.result.length){
                    result = [...result, ...triResult.result];
                }
                if(triResult.rest.length){
                    let colorSequenceResult = getColorSequences(triResult.rest);
                    if(colorSequenceResult.result.length){
                        result = [...result, ...colorSequenceResult.result];
                    }
                    if(colorSequenceResult.rest.length){
                        let sequenceResult = getSequences(colorSequenceResult.rest);
                        if(sequenceResult.result.length){
                            result = [...result, ...sequenceResult.result];
                        }
                        if(sequenceResult.rest.length){
                            let colorResult = getColors(sequenceResult.rest);
                            if(colorResult.result.length){
                                result = [...result, ...colorResult.result];
                            }
                            if(colorResult.rest.length){
                                let pairResult = getPairs(colorResult.rest);
                                if(pairResult.result.length){
                                    result = [...result, ...pairResult.result];
                                }
                                if(pairResult.rest.length){
                                    let highCardResult = getHighCards(pairResult.rest);
                                    if(highCardResult.result.length){
                                        result = [...result, ...highCardResult.result];
                                    }
                                    if(highCardResult.rest.length){
                                        let tempResult = {
                                            level: levels.rest,
                                            of: null,
                                            weight: 0,
                                            result: highCardResult.rest
                                        }
                                        result.push(tempResult);
                                    }
                                }
                            }
                        }
                    }
                }
                let magicCards = [];
                for(let item of result){
                    for(let item2 of item.result){
                        if(item2.type === "A"){
                            item2.for = item2?.for ?? 'H';
                            item2.type = item2.for;
                            magicCards.push({
                                type: item2.for,
                                number: item2.number
                            });
                        }
                    }
                }
                if(magicCards.length){
                    for(let item of magicCards){
                        for(let [i, v] of result.entries()){
                            if(v.level == levels.tri && v?.of == item.number && v.result.length > 3){
                                if(item.type){
                                    let magicCardIndex = -1;
                                    for(let [i2, v2] of v.result.entries()){
                                        if(v2.type == item.type){
                                            magicCardIndex = i2;
                                            break;
                                        }
                                    }
                                    if(magicCardIndex > -1){
                                        v.result.splice(magicCardIndex, 1);
                                    }
                                }
                                
                            }
                            
                        }
                    }
                }
                return result;
            };
            
            /*
                handlers
            */
            
            var sortHandler = function(e){
                e.preventDefault();
                var el  = $(this);
                currentPlayingCards[0] = sortCardSet(currentPlayingCards[0]);
                reorderCardDoms(0);
                setCardPositions(0);
            };

            var makeHandler = function (e){
                e.preventDefault();
                var el  = $(this);
                var data = getBestResult(currentPlayingCards[0]);
                var newSet = [];
                for(let item of data){
                    for(let item2 of item.result){
                        newSet.push(item2);
                    }
                }
                currentPlayingCards[0] = newSet;
                reorderCardDoms(0);
                setCardPositions(0);
            };

            var readyHandler = function(e){
                e.preventDefault();
                var el  = $(this);
                currentBatchNo = 0;
                let ownResult = finalizeOwnCard();
                if(ownResult){
                    setCardIntoTable(1);
                    setCardIntoTable(2);
                    setCardIntoTable(3);
                    
                    finalPlayingCards[0] = ownResult;
                    let otherPlayers = [1,2,3];
                    for(let player of otherPlayers){
                        var data = getBestResult(currentPlayingCards[player]);
                        finalPlayingCards[player] = data;
                        var newSet = [];
                        for(let item of data){
                            for(let item2 of item.result){
                                newSet.push(item2);
                            }
                        }
                        reviewCardsAll[player] = clone(newSet);
                        currentPlayingCards[player] = newSet;
                        reorderCardDoms(player);
                        setCardPositions(player);
                    }
                    setTimeout(() => {
                        $('body').addClass('round-running').removeClass('round-ended round-started');
                        pickCardBatch();
                    }, 100)
                }
            };

            var resultShowHandler = function(e){
                e.preventDefault();
                showModal('.result-modal');
            };

            var resultHideHandler = function(e){
                e.preventDefault();
                hideModal('.result-modal');
                if(!reviewPreviousRound){
                    if(roundEnded){   
                        if(gameOver){
                            initGame();
                        }
                        else{
                            gameRound();
                        }
                    }
                }
            };

            var reviewHandler = function(e){
                e.preventDefault();
                reviewPreviousRound = true;
                hideModal('.result-modal');
                $('body').addClass('doing-review');
                currentPlayingCards = reviewCardsAll;
                $(`.player-area-table-cell`).removeClass('turn-to-board turned-to-board return-to-winner returned-to-winner');
                reorderCardDoms(0);
                reorderCardDoms(1);
                reorderCardDoms(2);
                reorderCardDoms(3);
                setCardPositions(0);
                setCardPositions(1);
                setCardPositions(2);
                setCardPositions(3);
            };

            var reviewDoneHandler = function(e){
                e.preventDefault();
                reviewPreviousRound = false;
                $('body').removeClass('doing-review');
                resultHideHandler(e);
            };

            if(gameNumber > 1){
                $(document).off('click.game', '.sort-btn');
                $(document).off('click.game', '.make-btn');
                $(document).off('click.game', '.ready-btn');
                $(document).off('click.game', '.points-btn');
                $(document).off('click.game', '.result-modal .modal-close-btn');
                $(document).off('click.game', '.result-modal .review-btn');
                $(document).off('click.game', '.review-done-btn');
            }
            $(document).on('click.game', '.sort-btn', sortHandler);
            $(document).on('click.game', '.make-btn', makeHandler);
            $(document).on('click.game', '.ready-btn', readyHandler);
            $(document).on('click.game', '.points-btn', resultShowHandler);
            $(document).on('click.game', '.result-modal .modal-close-btn', resultHideHandler);
            $(document).on('click.game', '.result-modal .review-btn', reviewHandler);
            $(document).on('click.game', '.review-done-btn', reviewDoneHandler);
            
            $('.player-area .player-area-table').remove();
            $('body').addClass('round-started').removeClass('round-ended round-running doing-review');
            
            initCards();
            prepareCardTable();
        };

        gameRound();
    };

    $(document).on('click', '.modal .modal-close-btn', function (e) {
        e.preventDefault();
        var el  = $(this);
        var modal = el.closest('.modal');
        hideModal(modal);
    });

    $(document).on('click', '.reload-btn', function (e) {
        e.preventDefault();
        var el  = $(this);
        initGame();
    });

    initGame();
});