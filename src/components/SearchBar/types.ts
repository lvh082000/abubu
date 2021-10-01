type Option = {id: string | number; title: string};

export interface SearchButtonProps {
  searchOptions?: Array<Option>;
  initialSearchIndex?: number;
  onSelectSearch?: (value: number | string) => void;
}

export interface FilterButtonProps {
  filterOptions?: Array<Option> | undefined;
  initialFilterIndex?: number;
  onSelectFilter?: (value: number | string) => void;
}
