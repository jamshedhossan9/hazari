$(function(){
    var madeSortable = false;
    var heartIcon = `<svg class="svg-icon" height="800px" width="800px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.001 512.001" xml:space="preserve">
            <g>
                <g>
                    <path style="fill:currentColor" d="M368.459,20.727c-44.919,0-85.82,20.784-112.458,54.367c-26.583-33.509-67.448-54.367-112.459-54.367
                        C64.392,20.727,0,85.119,0,164.267c0,91.398,58.04,172.206,124.794,234.054c60.426,55.986,120.038,89.32,122.546,90.711
                        c2.693,1.495,5.677,2.242,8.661,2.242c2.983,0,5.968-0.747,8.661-2.242c2.508-1.391,62.121-34.727,122.546-90.711
                        c66.784-61.878,124.793-142.68,124.793-234.054C512,85.119,447.608,20.727,368.459,20.727z"/>
                </g>
            </g>
        </svg>`;
    var diamondIcon = `<svg class="svg-icon" width="800px" height="800px" viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
            <defs></defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path style="fill:currentColor" d="M7.92950166,15.644 L3.34050166,8.796 C2.88750166,8.342 2.88650166,7.608 3.33750166,7.155 L7.90350166,0.323 C8.35450166,-0.13 9.08950166,-0.128 9.54550166,0.325 L14.0865017,7.175 C14.5405017,7.628 14.5415017,8.363 14.0895017,8.816 L9.57150166,15.646 C9.57150166,15.646 8.38450166,16.097 7.92950166,15.644 Z" class="si-glyph-fill"></path>
            </g>
        </svg>`;
    var clubIcon = `<svg class="svg-icon" width="800px" height="800px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet">
            <path style="fill:currentColor" d="M25.5 28a7.5 7.5 0 0 0 7.5-7.5a7.5 7.5 0 0 0-7.5-7.5a7.45 7.45 0 0 0-3.73 1h-.21a6.972 6.972 0 0 0 3.423-6a6.983 6.983 0 1 0-13.967 0a6.972 6.972 0 0 0 3.423 6h-.208c-1.1-.633-2.371-1-3.731-1a7.5 7.5 0 0 0 0 15a7.476 7.476 0 0 0 5.46-2.368C15.549 29.753 11.205 33 7 33h.5a1.5 1.5 0 1 0 0 3h21a1.5 1.5 0 0 0 0-3h.5c-4.205 0-8.549-3.248-8.959-7.369A7.47 7.47 0 0 0 25.5 28z"></path>
        </svg>`;
    var spadeIcon = `<svg class="svg-icon" height="800px" width="800px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 57.938 57.938" xml:space="preserve">
            <g>
                <path style="fill:currentColor" d="M54.822,24.938C51.086,18.334,43.441,8.828,29.154,0.051c-0.112-0.069-0.258-0.069-0.369,0
                    C14.5,8.828,6.853,18.045,3.116,24.649c-4.395,7.767-1.889,17.151,6.104,21.119c2.084,1.034,3.599,1.17,5.396,1.17
                    c0,0,0.44-0.015,1.164-0.123c3.212-0.48,6.165-2.041,8.45-4.349l0.325-0.328c0.475-0.48,1.29-0.103,1.227,0.57
                    c-0.339,3.645-0.998,9.113-3.787,12.591c-0.855,1.066-0.155,2.64,1.212,2.64h11.534c1.363,0,2.058-1.57,1.204-2.633
                    c-2.824-3.516-3.462-9.069-3.807-12.715c-0.054-0.569,0.648-0.876,1.033-0.453l0,0c1.992,2.194,4.562,3.806,7.428,4.56
                    c1.595,0.42,2.721,0.53,2.721,0.53c1.797,0,3.313-0.136,5.396-1.17C56.711,42.089,59.217,32.705,54.822,24.938z"/>
            </g>
        </svg>`;
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
        for(let player of players){
            let playerTable = $(`.player-area[data-no="${player}"] .player-area-table`);
            let cardPosition = $(`.submit-table .card-set-${player} .card-2`).get(0).getBoundingClientRect();
            let cards = $(`.player-area[data-no="${player}"] .player-area-table-cell.turn-to-board:not(.withdrawn-from-board):not(.returned-to-winner)`);
            let playerTableArea = playerTable.get(0).getBoundingClientRect();
            let _transform = [
                `translateX(calc(var(--card-width) * -0.8)) translateY(calc(var(--card-height) * .15)) rotate(-17deg)`,
                `translateX(calc(var(--card-width) * -0.4)) translateY(calc(var(--card-height) * .04)) rotate(-5deg)`,
                `translateX(0) translateY(0) rotate(0deg)`,
                `translateX(calc(var(--card-width) * 0.4)) translateY(calc(var(--card-height) * 0)) rotate(5deg)`,
            ];
            let transform = [];
            if(cards.length == 3){
                transform[0] = _transform[1];
                transform[1] = _transform[2];
                transform[2] = _transform[3];
                
            }
            if(cards.length == 4){
                transform[0] = _transform[0];
                transform[1] = _transform[1];
                transform[2] = _transform[2];
                transform[3] = _transform[3];
            }
            let top = 0, left = 0;
            top = cardPosition.top - playerTableArea.top, left = cardPosition.left - playerTableArea.left;
            let zIndex = 5;
            cards.each(function(i){
                let el = $(this);
                let serial = _parseInt(el.attr('data-card-serial'));
                el.addClass('turned-to-board').css({left:`${left}px`, top:`${top}px`, 'z-index': serial + 1, transform: transform[serial]});
            });
            
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
            el.addClass('returned-to-winner').css({left: `${left}px`, top: `${top}px`, transform: `translateX(0) translateY(0) rotate(0deg)`});
        });
    };

    var setCardPositions = function(no, callback){
        no = no ?? 0;
        setTimeout(function(){
            let area = $('.player-area[data-no="'+no+'"] .player-area-table-wrapper .player-area-table');
            if(area.length){
                let wrapper = area.closest('.player-area');
                let lefts = [0], tops = [0];
                if(wrapper.hasClass('vertical-list')){
                    let lastTop =  ((area.height() - area.find('.player-area-table-cell:first-child').height()) / area.height()) * 100;
                    let chunk = lastTop / 12;
                    for(let i = 1; i <= 11; i++){
                        tops.push(i * chunk);
                    }
                    tops.push(lastTop);
                }
                else{
                    let lastLeft =  ((area.width() - area.find('.player-area-table-cell:first-child').width()) / area.width()) * 100;
                    let chunk = lastLeft / 12;
                    for(let i = 1; i <= 11; i++){
                        lefts.push(i * chunk);
                    }
                    lefts.push(lastLeft);
                }
                var left = 0;
                var width = 100 / 13;
                area.find('>.player-area-table-cell:not(.ui-sortable-helper)').each(function(i){
                    let el = $(this);
                    if(wrapper.hasClass('vertical-list')){
                        let negativeTop =  0;
                        el.css({top:`${tops[i]}%`, left:`0px`});
                    }
                    else{
                        el.css({ top:`0px`, left:`${lefts[i]}%`});
                    }
                    left += width;
                })
            }
            if(typeof callback === "function"){
                callback();
            }
        }, 0);
    };

    var setAllCardPositions = function(){
        setCardPositions(0);
        setCardPositions(1);
        setCardPositions(2);
        setCardPositions(3);
    };

    var positionSubmitTable = function(){
        let player0 = $('.player-area[data-no="0"] .identity').get(0).getBoundingClientRect();
        let player1 = $('.player-area[data-no="1"] .identity').get(0).getBoundingClientRect();
        let player2 = $('.player-area[data-no="2"] .identity').get(0).getBoundingClientRect();
        let player3 = $('.player-area[data-no="3"] .identity').get(0).getBoundingClientRect();
        let height = player0.top - player2.bottom, width = player3.left - player1.right;
        $('.submit-table').css({width:`${width}px`, height:`${height}px`});
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
            waitAfterRound = frequency * 10, // seconds
            cardDefaultTransition = 500; // ms

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

            var useSample = 0;
            var sampleSet = [];
            sampleSet[1] = `9H 3D 3C WH WS 6C 2S 7D 3S 5S KH QC 2H,WC KC 4S 2D 5D 4D 6S 5C 6H KD 9C 7C 3H,8H JS JD 7S AS 8D 4C AH KS 6D 9D 8C 9S,JH AC QS 4H AD JC 7H QD QH 5H WD 2C 8S`;
            sampleSet[2] = `AD AC 6D WS QH KH 5C JC 2D 5S 5D 4H QD,WD 7C 3S 3D 9C 2C 8S JS 3C KS 2H 8D KC,7H WH 4D WC AH JD 6S KD 5H 9H 9D 4C 6H,7D 8C 3H AS 2S QS 9S 4S 7S QC JH 8H 6C`;
            sampleSet[3] = `7D AS QS 5D 7C 4H WD 7S 3C 2C JC 9S 2H,4D 6H WH 7H WC JH 3S AC 6D KS 2S 4C 9D,3D WS JS 8D KD 2D 5S 8H 4S QD 5H 8S 9H,3H 6S JD AD 9C KC 8C KH 5C QC AH 6C QH`;

            var currentPlayingCards = null,
                ownInitialCards = ``,
                finalPlayingCards = {},
                currentBatchNo = 0,
                roundEnded = false,
                roundTotalPoints = {0:0, 1:0, 2:0, 3:0},
                reviewCardsAll = {},
                cardNumbers = `A-K-Q-J-W-9-8-7-6-5-4-3-2`.split('-'),
                cardTypes = 'H-S-D-C'.split('-'), // heart, spades, diamond, club
                typeIcons = {
                    'H': heartIcon,
                    'S': spadeIcon,
                    'D': diamondIcon,
                    'C': clubIcon
                },
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
            madeSortable = false;

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
                if(useSample){
                    let sample = sampleSet[useSample].split(',');
                    let cards = [];
                    for(let [i, v] of sample.entries()){
                        cards[i] = cardUnserialize(v);
                    }
                    return cards;
                }
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

            var sizeSortHandlers = function(){
                let area = $(`.player-area[data-no="0"] .player-area-table`);
                let items = area.find(`.player-area-table-cell:not(.sortable-chosen)`);
                let areaReact = area.get(0).getBoundingClientRect();
                let height = areaReact.bottom;
                items.css({height: `${height}px`});
            };

            /*
                these methods are used to show cards properly in UI
            */
            var setCardIntoTable = function(no, blank){
                no = no ?? 0;
                blank = blank ?? false;
                // blank = false;
                cards = currentPlayingCards[no];
                let area = $('.player-area[data-no="'+no+'"] .player-area-table-wrapper');
                let table = area.find('.player-area-table');
                if(!table.length){
                    area.append('<div class="player-area-table"></div>');
                }
                table = area.find('.player-area-table');
                if(table.length){
                    let wrapper = area.closest('.player-area');
                    let cells = ``;
                    let i = 0;
                    for(let item of cards){
                        let _number = item.number == 'W' ? '10' : item.number;
                        if(blank){
                            //  data-symbol="${item.number}${item.type}"
                            cells += `<div class="player-area-table-cell" data-no="${i}">
                                <div class="player-area-table-card-wrapper">
                                    <div class="cardback">
                                        <div class="cardback-child">
                                            <img class="card-back-svg" src="assets/icons/card-back.svg"/>
                                        </div>
                                    </div>
                                    <div class="player-area-table-card-holder">
                                        <span class="number number-top"></span>
                                        <span class="number number-bottom"></span>
                                        <span class="type type-1">
                                        </span>
                                        <span class="type type-2">
                                        </span>
                                        <span class="type type-3">
                                        </span>
                                    </div>
                                </div>
                            </div>`;
                        }
                        else {
                            let existingCell = [];
                            if(no > 0){
                                existingCell = table.find(`.player-area-table-cell[data-no="${i}"]`);
                            }
                            let temp = `<div class="player-area-table-cell" data-no="${i}" data-card-type="${item.type}" data-card-number="${item.number}" data-card-weight="${item.weight}">
                                        <div class="player-area-table-card-wrapper">
                                            <div class="cardback">
                                                <div class="cardback-child">
                                                    <img class="card-back-svg" src="assets/icons/card-back.svg"/>
                                                </div>
                                            </div>
                                            <div class="player-area-table-card-holder" data-card-type="${item.type}" data-card-number="${item.number}" data-card-weight="${item.weight}">
                                                <span class="number number-top">${_number}</span>
                                                <span class="number number-bottom">${_number}</span>
                                                <span class="type type-1">${typeIcons[item.type]}</span>
                                                <span class="type type-2">${typeIcons[item.type]}</span>
                                                <span class="type type-3">${typeIcons[item.type]}</span>
                                            </div>
                                        </div>
                                    </div>`;
                            if(existingCell.length){
                                existingCell.attr('data-card-type', item.type);
                                existingCell.attr('data-card-number', item.number);
                                existingCell.attr('data-card-weight', item.weight);
                                existingCell.find('.player-area-table-card-holder').attr('data-card-type', item.type);
                                existingCell.find('.player-area-table-card-holder').attr('data-card-number', item.number);
                                existingCell.find('.player-area-table-card-holder').attr('data-card-weight', item.weight);
                                existingCell.find('.player-area-table-card-holder .number-top').html(`${_number}`);
                                existingCell.find('.player-area-table-card-holder .number-bottom').html(`${_number}`);
                                existingCell.find('.player-area-table-card-holder .type-1').html(`${typeIcons[item.type]}`);
                                existingCell.find('.player-area-table-card-holder .type-2').html(`${typeIcons[item.type]}`);
                                existingCell.find('.player-area-table-card-holder .type-3').html(`${typeIcons[item.type]}`);

                            }
                            else{
                                cells += temp;
                            }
                        }
                        i++;
                    }
                    if(cells){
                        table.append(cells);
                    }
                    setCardPositions(no);

                    if(no == 0 && !madeSortable){
                        madeSortable = true;
                        let axis = 'x';
                        var dragGhost = {};
                        table.sortable({
                            direction: 'horizontal',
                            animation: 200, 
                            easing: "cubic-bezier(1, 0, 0, 1)",
                            dragClass: "sortable-drag",
                            fallbackClass: "sortable-fallback",
                            onStart: function(evt){
                                $('body').addClass('being-menaully-sorted');
                                sizeSortHandlers();
                            },
                            onEnd: function(evt){
                                $('body').removeClass('being-menaully-sorted');
                            },
                        });
                        
                    }
                    
                }
            }

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

            var listPositioningCardSetBeforeSubmit = function(setPositions){
                let area = $('.review-modal .review-card-list');
                let html = ``;
                let changeTrack = ['', '', '', ''];
                let repaired = [];
                for(let [i,v] of setPositions.entries()){
                    if(i == 0 || v.str !== repaired[repaired.length-1].str){
                        repaired.push(v);
                    }
                }
                repaired.push(repaired[repaired.length-1]);
                for(let item3 of repaired){
                    let cards = clone(item3.obj);
                    let chunks = [];
                    for(let i = 0; i < 4; i++){
                        chunks.push(cards.splice(0,3));
                    }
                    chunks.push(cards);
        
                    let tempHtml = `<div class="card-row">`;
                    let i = 0;
                    for(let [i2, item2] of chunks.entries()){
                        let hasChange = false;
                        let serialize = cardSerialize(item2);
                        if(changeTrack[i2] && serialize != changeTrack[i2]){
                            hasChange = true;
                        }
                        changeTrack[i2] = serialize;
                        let tempHtml2 = `<div class="card-column ${hasChange ? `has-change` : ``}">`;
                        for(let item of item2){
                            let _number = item.number == 'W' ? '10' : item.number;
                            tempHtml2 += `
                                <div class="player-area-table-card-holder" data-card-type="${item.type}" data-card-number="${item.number}" data-card-weight="${item.weight}">
                                    <span class="number number-top">${_number}</span>
                                    <span class="number number-bottom">${_number}</span>
                                    <span class="type type-1">${typeIcons[item.type]}</span>
                                    <span class="type type-2">${typeIcons[item.type]}</span>
                                    <span class="type type-3">${typeIcons[item.type]}</span>
                                </div>
                            `;
                            i++;
                        }
                        tempHtml2 += `</div>`;
                        tempHtml += tempHtml2;
                    }
                    tempHtml += `</div>`;
                    html += tempHtml;
                }
                area.html(html);
            };

            var prepareCardTable = function(){
                currentPlayingCards = generateCards();
                // currentPlayingCards[0] = cardUnserialize(sampleSet6);
                ownInitialCards = cardSerialize(sortCardSet(clone(currentPlayingCards[0])));
                console.log(`${cardSerialize(currentPlayingCards[0])},${cardSerialize(currentPlayingCards[1])},${cardSerialize(currentPlayingCards[2])},${cardSerialize(currentPlayingCards[3])}`);
                setCardIntoTable(1, true);
                setCardIntoTable(2, true);
                setCardIntoTable(3, true);
                setCardIntoTable(0);
                setTimeout(() => {
                    $('body').addClass('no-transition');
                    $('body').addClass('round-started');
                    setTimeout(() => {
                        $('body').removeClass('before-round-started');
                        setTimeout(() => {
                            $('body').removeClass('no-transition');
                        }, 100);
                    }, 10);
                }, cardDefaultTransition);
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
                $('body').addClass('round-ended no-transition').removeClass('round-started round-running');
                let modal = $('.result-modal');
                setTimeout(() => {
                    $('body').removeClass('no-transition')
                    showModal(modal);
                }, serverInterval * 1000)
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
                    let setPositions = [];
                    setPositions.push({
                        obj: clone(cards),
                        str: cardSerialize(cards),
                    });
                    reviewCardsAll[0] = clone(cards);
                    let chunks = [];
                    for(let i = 0; i < 3; i++){
                        chunks.push(cards.splice(0,3));
                    }
                    chunks.push(cards);

                    function addResultIntoSetPos(data){
                        let tempNewCards = [];
                        for(let item of data){
                            tempNewCards = [...tempNewCards, ...item.result];
                        }
                        setPositions.push({
                            obj: tempNewCards,
                            str: cardSerialize(tempNewCards),
                        });
                    }
                    
                    let result = [];
                    for(let item of chunks){
                        let temp = getBestResult(item);
                        result = [...result, ...temp];
                    }
                    addResultIntoSetPos(result);
                    result = sortFinalResultSet(result);
                    addResultIntoSetPos(result);
                    console.log(clone(result))
                    while(true){
                        let lastSet = [...result[3].result, ...result[4].result];
                        let lastResult = getBestResult(lastSet);
                        if(lastResult[0].level > result[2].level || (lastResult[0].level == result[2].level && lastResult[0].weight > result[2].weight)){
                            result[3] = lastResult[0];
                            result[4] = lastResult[1];
                            addResultIntoSetPos(result);
                            result = sortFinalResultSet(result);
                            addResultIntoSetPos(result);
                        }
                        else{
                            addResultIntoSetPos(result);
                            result[3] = lastResult[0];
                            result[4] = lastResult[1];
                            addResultIntoSetPos(result);
                            break;
                        }
                    }
                    let newCards = [];
                    for(let item of result){
                        newCards = [...newCards, ...item.result];
                    }
                    finalResult = result;
                    console.log(setPositions);
                    for(let item of setPositions){
                        console.log(item.str);
                    }
                    listPositioningCardSetBeforeSubmit(setPositions);
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
                }, 100); //  serverInterval * 1000
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
                $('body').addClass('no-transition');
                setCardPositions(0);
                $('body').addClass('auto-sorting-card');
                setTimeout(() => {
                    $('body').removeClass('no-transition');
                    currentPlayingCards[0] = sortCardSet(currentPlayingCards[0]);
                    reorderCardDoms(0);
                    setCardPositions(0, function(){
                        setTimeout(() => {
                            $('body').addClass('no-transition');
                            $('body').removeClass('auto-sorting-card');
                            setTimeout(() => {
                                $('body').removeClass('no-transition');
                            }, 100);
                        }, cardDefaultTransition);
                    });
                }, 10);
                
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
                        $('body').addClass('no-transition');
                        setCardPositions(0, function(){
                            setTimeout(() => {
                                $('body').addClass('round-running')
                                $('body').removeClass('round-started');
                                $('body').removeClass('round-started');
                                setTimeout(() => {
                                    $('body').removeClass('no-transition');
                                    pickCardBatch();
                                }, 100);
                            }, 100);
                        });
                        
                        
                    }, cardDefaultTransition)
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

            var checkSetSeqHandler = function(e){
                e.preventDefault();
                reviewHandler(e);
                showModal('.review-modal');
            };

            if(gameNumber > 1){
                $(document).off('click.game', '.sort-btn');
                $(document).off('click.game', '.make-btn');
                $(document).off('click.game', '.ready-btn');
                $(document).off('click.game', '.points-btn');
                $(document).off('click.game', '.result-modal .modal-close-btn');
                $(document).off('click.game', '.result-modal .review-btn');
                $(document).off('click.game', '.review-done-btn');
                $(document).off('click.game', '.check-set-seq-btn');
            }
            $(document).on('click.game', '.sort-btn', sortHandler);
            $(document).on('click.game', '.make-btn', makeHandler);
            $(document).on('click.game', '.ready-btn', readyHandler);
            $(document).on('click.game', '.points-btn', resultShowHandler);
            $(document).on('click.game', '.result-modal .modal-close-btn', resultHideHandler);
            $(document).on('click.game', '.result-modal .review-btn', reviewHandler);
            $(document).on('click.game', '.review-done-btn', reviewDoneHandler);
            $(document).on('click.game', '.check-set-seq-btn', checkSetSeqHandler);
            
            $('.player-area .player-area-table').remove();
            $('body').addClass('before-round-started').removeClass('round-ended round-running doing-review');
            
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

    $(window).on('load resize', function(){
        setAllCardPositions();
        // positionSubmitTable();
        positionSubmittedTableCards();
        positionWonTableCards();
    });

    initGame();
});