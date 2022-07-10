var prefixes = ["zod","nec","bud","wes","sev","per","sut","let","ful","pen","syt","dur","wep","ser","wyl","sun","ryp","syx","dyr","nup","heb","peg","lup","dep","dys","put","lug","hec","ryt","tyv","syd","nex","lun","mep","lut","sep","pes","del","sul","ped","tem","led","tul","met","wen","byn","hex","feb","pyl","dul","het","mev","rut","tyl","wyd","tep","bes","dex","sef","wyc","bur","der","nep","pur","rys","reb","den","nut","sub","pet","rul","syn","reg","tyd","sup","sem","wyn","rec","meg","net","sec","mul","nym","tev","web","sum","mut","nyx","rex","teb","fus","hep","ben","mus","wyx","sym","sel","ruc","dec","wex","syr","wet","dyl","myn","mes","det","bet","bel","tux","tug","myr","pel","syp","ter","meb","set","dut","deg","tex","sur","fel","tud","nux","rux","ren","wyt","nub","med","lyt","dus","neb","rum","tyn","seg","lyx","pun","res","red","fun","rev","ref","mec","ted","rus","bex","leb","dux","ryn","num","pyx","ryg","ryx","fep","tyr","tus","tyc","leg","nem","fer","mer","ten","lus","nus","syl","tec","mex","pub","rym","tuc","fyl","lep","deb","ber","mug","hut","tun","byl","sud","pem","dev","lur","def","bus","bep","run","mel","pex","dyt","byt","typ","lev","myl","wed","duc","fur","fex","nul","luc","len","ner","lex","rup","ned","lec","ryd","lyd","fen","wel","nyd","hus","rel","rud","nes","hes","fet","des","ret","dun","ler","nyr","seb","hul","ryl","lud","rem","lys","fyn","wer","ryc","sug","nys","nyl","lyn","dyn","dem","lux","fed","sed","bec","mun","lyr","tes","mud","nyt","byr","sen","weg","fyr","mur","tel","rep","teg","pec","nel","nev","fes"]
var suffixes = ["doz","mar","bin","wan","sam","lit","sig","hid","fid","lis","sog","dir","wac","sab","wis","sib","rig","sol","dop","mod","fog","lid","hop","dar","dor","lor","hod","fol","rin","tog","sil","mir","hol","pas","lac","rov","liv","dal","sat","lib","tab","han","tic","pid","tor","bol","fos","dot","los","dil","for","pil","ram","tir","win","tad","bic","dif","roc","wid","bis","das","mid","lop","ril","nar","dap","mol","san","loc","nov","sit","nid","tip","sic","rop","wit","nat","pan","min","rit","pod","mot","tam","tol","sav","pos","nap","nop","som","fin","fon","ban","mor","wor","sip","ron","nor","bot","wic","soc","wat","dol","mag","pic","dav","bid","bal","tim","tas","mal","lig","siv","tag","pad","sal","div","dac","tan","sid","fab","tar","mon","ran","nis","wol","mis","pal","las","dis","map","rab","tob","rol","lat","lon","nod","nav","fig","nom","nib","pag","sop","ral","bil","had","doc","rid","moc","pac","rav","rip","fal","tod","til","tin","hap","mic","fan","pat","tac","lab","mog","sim","son","pin","lom","ric","tap","fir","has","bos","bat","poc","hac","tid","hav","sap","lin","dib","hos","dab","bit","bar","rac","par","lod","dos","bor","toc","hil","mac","tom","dig","fil","fas","mit","hob","har","mig","hin","rad","mas","hal","rag","lag","fad","top","mop","hab","nil","nos","mil","fop","fam","dat","nol","din","hat","nac","ris","fot","rib","hoc","nim","lar","fit","wal","rap","sar","nal","mos","lan","don","dan","lad","dov","riv","bac","pol","lap","tal","pit","nam","bon","ros","ton","fod","pon","sov","noc","sor","lav","mat","mip","fip"]

// 0,188,212,231

/*
tarots 22
planets 10
trees 25
futhark 25
crystals 33
elements 4
iching 64
zodiac 13
infinity 1
zero 1
dice 6
conjunction aspects 4
non-verbal communicaton 9
days of the week metals 7
creatures 22
sephiroth 10
*/
const library = {
      0: '🃟',
      1: '⚚',
      2: '♕',
      3: '⚘',
      4: '♖',
      5: '♔',
      6: '☂',
      7: '♘',
      8: '☮',
      9: '☯',
      10: '☸',
      11: '⚖',
      12: '♱',
      13: '☠',
      14: '♻',
      15: '☢',
      16: '☖',
      17: '★',
      18: '☽',
      19: '☼',
      20: '⚱',
      21: '⚬',
      22: '∅',
      23: 'RED',
      24: 'ORANGE',
      25: 'YELLOW',
      26: 'GREEN',
      27: 'BLUE',
      28: 'INDIGO',
      29: 'VIOLET',
      30: '∞',
      31: '☉',
      32: '☿',
      33: '♀',
      34: '♁',
      35: '♂',
      36: '♃',
      37: '♄',
      38: '♅',
      39: '♆',
      40: '♇',
      41: '⚀',
      42: 'Birch 𐂷 BEITH',
      43: 'Rowan 𐂷 LUIS',
      44: 'Alder 𐂷 FEARN',
      45: 'Willow 𐂷 SAILLE',
      46: 'Ash 𐂷 NUIN',
      47: 'Hawthon 𐂷 HUATHE',
      48: 'Oak 𐂷 DUIR',
      49: 'Holly 𐂷 TINNE',
      50: 'Hazel 𐂷 COLL',
      51: 'Apple 𐂷 QUERT',
      52: 'Vine 𐂷 MUIN',
      53: 'Ivy 𐂷 GORT',
      54: 'Reed 𐂷 NGETAL',
      55: 'Blackthorn 𐂷 STRAIF',
      56: 'Elder 𐂷 RUIS',
      57: 'Silver Fir 𐂷 AILIM',
      58: 'Furze 𐂷 OHN',
      59: 'Heather 𐂷 UR',
      60: 'Poplar 𐂷 EADHA',
      61: 'Yew 𐂷 IOHO',
      62: 'The Grove 𐂷 KOAD',
      63: 'Spindle 𐂷 OIR',
      64: 'Honeysuckle 𐂷 UNILEAND',
      65: 'Beech 𐂷 PHAGOS',
      66: 'The Sea 𐂷 MOR',
      67: '⚁',
      68: 'The Self ᛗ MANNAZ',
      69: 'Partnership ᚷ GEBO',
      70: 'Signals ᚫ ANSUZ',
      71: 'Seperation  OTHILA',
      72: 'Strength  URUZ',
      73: 'Initiatian PERTH',
      74: 'Constraint  NAUTHIZ',
      75: 'Fertility  INGUZ',
      76: 'Defense  EIHWAZ',
      77: 'Protection ᛉ ALGIZ',
      78: 'Posessions  FEHU',
      79: 'Joy  WUNJO',
      80: 'Harvest  JERA',
      81: 'Opening  KANO',
      82: 'Warrior  TEIWAZ',
      83: 'Growth  BERKANA',
      84: 'Movement  EHWAZ',
      85: 'Flow  LAGUZ',
      86: 'Disruption  HAGALAZ',
      87: 'Journey ᚱ RAIDO',
      88: 'Gateway  THURISAZ',
      89: 'Breakthrough  DAGAZ',
      90: 'Standstill  ISA',
      91: 'Wholeness  SOWELU',
      92: 'Unknowable  ODIN',
      93: '⚂',
      94: '🜁',
      95: '🜂',
      96: '🜃',
      97: '🜄',
      98: '⚃',
      99: '',
      100: '',
      101: '',
      102: '',
      103: '',
      104: '',
      105: '',
      106: '',
      107: '',
      108: '',
      109: '',
      110: '',
      111: '',
      112: '',
      113: '',
      114: '',
      115: '',
      116: '',
      117: '',
      118: '',
      119: '',
      120: '',
      121: '',
      122: '',
      123: '',
      124: '',
      125: '',
      126: '',
      127: '',
      128: '',
      129: '',
      130: '',
      131: '',
      132: '',
      133: '',
      134: '',
      135: '',
      136: '',
      137: '',
      138: '',
      139: '',
      140: '',
      141: '',
      142: '',
      143: '',
      144: '',
      145: '',
      146: '',
      147: '',
      148: '',
      149: '',
      150: '',
      151: '',
      152: '',
      153: '',
      154: '',
      155: '',
      156: '',
      157: '',
      158: '',
      159: '',
      160: '',
      161: '',
      162: '',
      163: '',
      164: '',
      165: '',
      166: '',
      167: '',
      168: '',
      169: '',
      170: '',
      171: '',
      172: '',
      173: '',
      174: '',
      175: '',
      176: '',
      177: '',
      178: '',
      179: '',
      180: '',
      181: '',
      182: '',
      183: '',
      184: '',
      185: '',
      186: '',
      187: '',
      188: 'RED_JASPER',
      189: '',
      190: '',
      191: '',
      192: '',
      193: '',
      194: '',
      195: '',
      196: '',
      197: '',
      198: '',
      199: '',
      200: '',
      201: '',
      202: '',
      203: '',
      204: '',
      205: '',
      206: '',
      207: '',
      208: '',
      209: '',

      210: '☌',
      211: '⚯',
      212: '□',
      213: '♈︎',
      214: '☌',
      215: '⚯',
      216: '□',

      217: '',
      218: '',
      219: '',
      220: '',
      221: '',
      222: '',
      223: 'SUNDAY',
      224: 'MONDAY',
      225: 'TUESDAY',
      226: 'WEDNESDAY',
      227: 'THURSDAY',
      228: 'FRIDAY',
      229: 'SATURDAY',
      230: 'DOG',
      231: 'CAT',
      232: 'ROOSTER',
      233: 'COW',
      234: 'PIG',
      235: 'SPIDER',
      236: 'HORSE',
      237: 'SNAKE',
      238: 'FISH',
      239: 'FOX',
      240: 'BAT',
      241: 'MONKEY',
      242: 'TURTLE',
      243: 'BIRD',
      244: 'GOAT',
      245: 'MALKUTH',
      246: 'YESOD',
      247: 'HOD',
      248: 'NETZACH',
      249: 'TIPARETH',
      250: 'GEBURH',
      251: 'CHESED',
      252: 'DAATH',
      253: 'BINAH',
      254: 'CHOKMAH',
      255: 'KETER'
    }

export {
	prefixes,
	suffixes,
	library,
}