import sortedLastIndexBy from 'lodash.sortedlastindexby';
import orderBy from 'lodash.orderby';
import router from '@/router';

const order = {
  asc: 'asc',
  desc: 'desc'
} as const;
export type Order = typeof order[keyof typeof order];

export interface SortQuery {
  sortKeys: string[];
  sortOrders: Order[];
}

export class SortUtils {

  /**
   * keyに基づいてソートする。
   * @param array ソートしたい配列
   * @param keys ソートする為のkey配列
   * @param orders 昇順降順の選択
   * @returns ソートが完了した配列
   */
  public static orderBy<T>(array: T[], keys?: string[], orders?: Order[]): T[] {
    return orderBy(array, keys, orders);
  }

  /**
   * ソート済みの配列から探索対象が入る位置を2分探索する。
   * @param array 探索したい配列
   * @param value 探索対象とする値
   * @param iteratee `value`に含まれるkeyを`iteratee`として宣言する
   * @returns `value`が入る`index`情報
   */
  public static sortedLastIndexBy<T>(array: T[], value: T, iteratee: string): number {
    return sortedLastIndexBy(array, value, iteratee);
  }

  /**
   * ソート情報をURLから取得する
   * @returns ソートのqueryが入ったobject
   */
  public static getSortURLQuery(): SortQuery|void {
    const query = router.currentRoute.query;

    if (query.sortKeys) {
      return {
        sortKeys: query.sortKeys as string[],
        sortOrders: query.sortOrders as Order[]
      };
    }
  }

  /**
   * ソート情報をURLに追加する
   * @param sortKeys ソートするためのキー情報
   * @param sortOrders 昇順か降順かを指定する
   */
  public static setSortURLQuery(sortKeys: string[], sortOrders: Order[]): void {
    const routerName = router.currentRoute.name || '';
    router.replace({
      name: routerName,
      query: {
        ...router.currentRoute.query,
        sortKeys: sortKeys as string[],
        sortOrders: sortOrders
      }
    }).catch();
  }

  /**
   * 第一引数に渡した配列を情報に基づきソートする。
   * @param array ソートしたい配列
   * @param option ソートするための情報
   * @returns ソートが完了した配列
   */
  public static sort<T>(array: T[], option?: SortQuery): T[] {
    if (option) {
      this.setSortURLQuery(option.sortKeys, option.sortOrders);
    }

    const query = option || this.getSortURLQuery();

    if (!query) return array;

    return this.orderBy<T>(array, query.sortKeys as string[], query.sortOrders);
  }

  /**
   * ソート済み配列の適した位置に値を追加する。
   * @param array 追加したい配列
   * @param value 追加したい値
   * @param iteratee 検索したいkey情報
   */
  public static addToSortedList<T>(array: T[], value: T, iteratee: string): void {
    const index = this.sortedLastIndexBy(array, value, iteratee);
    array.splice(index, 0, value);
  }
}
