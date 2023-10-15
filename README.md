# logic-namping2

class LogicNamping2Class

含み損の購入総額に対する割合を一定にするためのロジッククラス

・現在の価格：price
・保有量：size
・購入総額：realCap ∑(購入時の価格 * 購入量)
・時価総額：marketCap = price * size
・含み損の購入総額に対する割合：nampingRate

現在の価格の時にナンピンする量: nampingSize = (marketCap - nampingRate * realCap) / ((nampingRate - 1) * price)
