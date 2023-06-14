import { isEqual } from "lodash";
import {
  CSSProperties,
  MouseEvent,
  ReactNode,
  memo,
  useEffect,
  useState,
} from "react";

export type TabItem = {
  key: string;
  iconWrapperStyle?: CSSProperties;
  icon: ReactNode;
  content?: ReactNode;
  onClick?: (tab: TabItem, e: MouseEvent) => any;
};

export type TabItems = TabItem[];

export interface TabProps {
  defaultActiveKey: string;
  items: TabItems;
}

const Tab = memo(
  ({ defaultActiveKey = "", items }: TabProps) => {
    const [key, setKey] = useState<string>("");

    function changeTab(item: TabItem, e: MouseEvent) {
      if (item?.content) {
        setKey(item.key);
      }
      item?.onClick?.(item, e);
    }

    useEffect(
      function initialTabKey() {
        setKey(defaultActiveKey);
      },
      [defaultActiveKey]
    );

    const currentItem = items.find((item) => item.key === key);

    return (
      <div className="h-full flex flex-col">
        <div className="flex flex-shrink-0 border-b border-gray-950">
          {items.map((item, index) => (
            <div
              style={{
                ...(item?.iconWrapperStyle || {}),
              }}
              key={index}
              className="ml-[-1px] mb-[-1px] group w-10 h-10 relative p-2 border-x border-gray-950"
            >
              <button
                onClick={(e) => changeTab(item, e)}
                className="absolute top-0 left-0 w-full h-full opacity-0 z-10"
              >
                {key}
              </button>
              <div
                className={[
                  "[&>*]:text-white",
                  item.key === key
                    ? "[&>*]:opacity-100"
                    : "group-hover:[&>*]:opacity-100 [&>*]:opacity-50",
                ].join(" ")}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1">
          {currentItem?.content ? currentItem.content : <></>}
        </div>
      </div>
    );
  },
  (p, n) => isEqual(p.items, n.items)
);

export { Tab };
