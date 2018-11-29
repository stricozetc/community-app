import * as d3 from 'd3';


declare module 'd3' {

  export function select<GElement extends BaseType, OldDatum>(selector: string): d3.Selection<d3.BaseType, {}, HTMLElement, any>;
  export function tip(): any;
  export interface Selection<GElement extends BaseType, Datum, PElement extends BaseType, PDatum> {
    // Sub-selection -------------------------

    /**
     * For each selected element, select the first descendant element that matches the specified selector string.
     * If no element matches the specified selector for the current element, the element at the current index will
     * be null in the returned selection. If multiple elements match the selector, only the first matching element
     * in document order is selected. Selection.select does not affect grouping: it preserves the existing group
     * structure and indexes, and propagates data (if any) to selected children.
     *
     * If the current element has associated data, this data is propagated to the
     * corresponding selected element.
     *
     * The generic represents the type of the descendant element to be selected.
     *
     * @param selector CSS selector string
     */
    select<DescElement extends BaseType>(selector: string): Selection<DescElement, Datum, PElement, PDatum>;
    /**
     * Create an empty sub-selection. Selection.select does not affect grouping: it preserves the existing group
     * structure and indexes.
     */
    select<DescElement extends BaseType>(selector: null): Selection<null, undefined, PElement, PDatum>;
    /**
     * For each selected element, select the descendant element returned by the selector function.
     * If no element is returned by the selector function for the current element, the element at the
     * current index will be null in the returned selection. Selection.select does not affect grouping:
     * it preserves the existing group structure and indexes, and propagates data (if any) to selected children.
     *
     * If the current element has associated data, this data is propagated to the
     * corresponding selected element.
     *
     * The generic represents the type of the descendant element to be selected.
     *
     * @param selector A selector function, which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * It must return an element, or null if there is no matching element.
     */
    select<DescElement extends BaseType>(selector: ValueFn<GElement, Datum, DescElement>): Selection<DescElement, Datum, PElement, PDatum>;

    /**
     * Create an empty sub-selection. Selection.selectAll does affect grouping: The elements in the returned
     * selection are grouped by their corresponding parent node in this selection, the group at the current index will be empty.
     */
    selectAll(): Selection<null, undefined, GElement, Datum>;
    /**
     * Create an empty sub-selection. Selection.selectAll does affect grouping: The elements in the returned
     * selection are grouped by their corresponding parent node in this selection, the group at the current index will be empty.
     */
    selectAll(selector: null): Selection<null, undefined, GElement, Datum>;
    /**
     * Create an empty sub-selection. Selection.selectAll does affect grouping: The elements in the returned
     * selection are grouped by their corresponding parent node in this selection, the group at the current index will be empty.
     */
    selectAll(selector: undefined): Selection<null, undefined, GElement, Datum>;
    /**
     * For each selected element, selects the descendant elements that match the specified selector string. The elements in the returned
     * selection are grouped by their corresponding parent node in this selection. If no element matches the specified selector
     * for the current element, the group at the current index will be empty. Selection.selectAll does affect grouping: each selected descendant
     * is grouped by the parent element in the originating selection.
     *
     * The selected elements do not inherit data from this selection; use selection.data to propagate data to children.
     *
     * The first generic "DescElement" refers to the type of descendant element to be selected. The second generic "OldDatum" refers to the type of the
     * datum, of a selected element. This is useful when re-selecting elements with a previously set, know datum type.
     *
     * @param selector CSS selector string
     */
    selectAll<DescElement extends BaseType, OldDatum>(selector: string): Selection<DescElement, OldDatum, GElement, Datum>;

    /**
     * For each selected element, selects the descendant elements returned by the selector function. The elements in the returned
     * selection are grouped by their corresponding parent node in this selection. If no element matches the specified selector
     * for the current element, the group at the current index will be empty. Selection.selectAll does affect grouping: each selected descendant
     * is grouped by the parent element in the originating selection.
     *
     * The selected elements do not inherit data from this selection; use selection.data to propagate data to children.
     *
     * The first generic "DescElement" refers to the type of descendant element to be selected. The second generic "OldDatum" refers to the type of the
     * datum, of a selected element. This is useful when re-selecting elements with a previously set, know datum type.
     *
     * @param selector A selector function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). It must return an array of elements
     * (or a pseudo-array, such as a NodeList), or the empty array if there are no matching elements.
     */
    selectAll<DescElement extends BaseType, OldDatum>(selector: ValueFn<GElement, Datum, DescElement[] | ArrayLike<DescElement>>): Selection<DescElement, OldDatum, GElement, Datum>;

    // Modifying -------------------------------

    /**
     * Return the current value of the specified attribute for the first (non-null) element in the selection.
     * This is generally useful only if you know that the selection contains exactly one element.
     *
     * @param name Name of the attribute
     */
    attr(name: string): string;
    /**
     * Clear the attribute with the specified name for the selected elements and returns this selection.
     *
     * @param name Name of the attribute
     * @param value null,to clear the attribute
     */
    attr(name: string, value: any): this;
    /**
     * Sets the value of the attribute with the specified name for the selected elements and returns this selection.
     * All elements are given the same attribute value.
     *
     * @param name Name of the attribute
     * @param value Constant value for the attribute
     */
    attr(name: string, value: string | number | boolean): this;
    /**
     * Sets the value of the attribute with the specified name for the selected elements and returns this selection.
     * The value for the individual selected elements is determined by the value function.
     *
     * @param name Name of the attribute
     * @param value A value function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).  A null value will clear the attribute.
     */
    attr(name: string, value: ValueFn<GElement, Datum, string | number | boolean | null>): this;

    /**
     * Returns true if and only if the first (non-null) selected element has the specified classes.
     * This is generally useful only if you know the selection contains exactly one element.
     *
     * @param name A string of space-separated class names.
     */
    classed(names: string): boolean;
    /**
     * Assigns or unassigns the specified CSS class names on the selected elements by setting
     * the class attribute or modifying the classList property and returns this selection.
     * If the constant value is truthy, then all elements are assigned the specified classes; otherwise, the classes are unassigned.
     *
     * @param names A string of space-separated class names.
     * @param value A boolean flag (true = assign / false = unassign)
     */
    classed(names: string, value: boolean): this;
    /**
     * Assigns or unassigns the specified CSS class names on the selected elements by setting
     * the class attribute or modifying the classList property and returns this selection.
     * The assign/unassign status for the individual selected elements is determined by the boolean return
     * value of the value function.
     *
     * @param names A string of space-separated class names.
     * @param value A value function which is evaluated for each selected element, in order,
     * being passed the current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * The function’s return value is then used to assign or unassign classes on each element.
     */
    classed(names: string, value: ValueFn<GElement, Datum, boolean>): this;

    /**
     * Returns the current value of the specified style property for the first (non-null) element in the selection.
     * The current value is defined as the element’s inline value, if present, and otherwise its computed value.
     * Accessing the current style value is generally useful only if you know the selection contains exactly one element.
     *
     * @param name Name of the style
     */
    style(name: string): string;
    /**
     * Clear the style with the specified name for the selected elements and returns this selection.
     *
     * @param name Name of the style
     * @param value null,to clear the style
     */
    style(name: string, value: any): any;
    /**
     * Sets the value of the style with the specified name for the selected elements and returns this selection.
     * All elements are given the same style value.
     *
     * @param name Name of the style
     * @param value Constant value for the style
     * @param priority An optional priority flag, either null or the string important (without the exclamation point)
     */
    style(name: string, value: string | number | boolean, priority?: null | 'important'): this;
    /**
     * Sets the value of the style with the specified name for the selected elements and returns this selection.
     * The value for the individual selected elements is determined by the value function.
     *
     * @param name Name of the style
     * @param value A value function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).  A null value will clear the style.
     * @param priority An optional priority flag, either null or the string important (without the exclamation point)
     */
    style(name: string, value: ValueFn<GElement, Datum, string | number | boolean | null>, priority?: null | 'important'): this;

    /**
     * Return the current value of the specified property for the first (non-null) element in the selection.
     * This is generally useful only if you know that the selection contains exactly one element.
     *
     * @param name Name of the property
     */
    property(name: string): any;
    /**
     * Look up a local variable on the first node of this selection. Note that this is not equivalent to `local.get(selection.node())` in that it will not look up locals set on the parent node(s).
     *
     * @param name The `d3.local` variable to look up.
     */
    property<T>(name: Local<T>): T | undefined;
    /**
     * Sets the value of the property with the specified name for the selected elements and returns this selection.
     * The value for the individual selected elements is determined by the value function.
     *
     * Some HTML elements have special properties that are not addressable using attributes or styles,
     * such as a form field’s text value and a checkbox’s checked boolean. Use this method to get or set these properties.
     *
     * @param name Name of the property
     * @param value A value function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).  A null value will clear the property.
     */
    property(name: string, value: ValueFn<GElement, Datum, any>): this;
    /**
     * Clears the property with the specified name for the selected elements and returns this selection.
     *
     * @param name Name of the property
     * @param value null,to clear the property
     */
    property(name: string, value: null): this;
    /**
     * Sets the value of the property with the specified name for the selected elements and returns this selection.
     * All elements are given the same property value.
     *
     * @param name Name of the property
     * @param value Constant value for the property
     */
    property(name: string, value: any): this;
    /**
     * Store a value in a `d3.local` variable.
     * This is equivalent to `selection.each(function (d, i, g) { name.set(this, value.call(this, d, i, g)); })` but more concise.
     *
     * @param name A `d3.local` variable
     * @param value A callback that returns the value to store
     */
    property<T>(name: Local<T>, value: ValueFn<GElement, Datum, T>): this;
    /**
     * Store a value in a `d3.local` variable for each node in the selection.
     * This is equivalent to `selection.each(function () { name.set(this, value); })` but more concise.
     *
     * @param name A `d3.local` variable
     * @param value A callback that returns the value to store
     */
    property<T>(name: Local<T>, value: T): this;

    /**
     * Returns the text content for the first (non-null) element in the selection.
     * This is generally useful only if you know the selection contains exactly one element.
     */
    text(): string;
    /**
     * Clear the text content of the selected elements and return the selection.
     */
    text(value: null): this;
    /**
     * Sets the text content to the specified value on all selected elements, replacing any existing child elements.
     * All elements are given the same text content.
     *
     * @param value Text content value for the elements.
     */
    text(value: string | number | boolean): this;
    /**
     * Sets the text content to the specified value on all selected elements, replacing any existing child elements.
     * All elements are given the same text content.
     *
     * @param value A value unction which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * The function’s return value is then used to set each element’s text content. A null value will clear the content.
     */
    text(value: ValueFn<GElement, Datum, string | number | boolean | null>): this;

    /**
     * Returns a string representation of the inner HTML for the first (non-null) element in the selection.
     * This is generally useful only if you know the selection contains exactly one element.
     */
    html(): string;
    /**
     * Clear the html content of the selected elements and return the selection.
     */
    html(value: null): this;
    /**
     * Sets the inner HTML to the specified value on all selected elements, replacing any existing child elements.
     * All elements are given the same inner HTML
     *
     * @param value String representation of inner HTML.
     */
    html(value: string): this;
    /**
     * Sets the inner HTML to the specified value on all selected elements, replacing any existing child elements.
     * The inner HTML is determined for each individual element using a value function.
     *
     * @param value A value function which is evaluated for each selected element, in order, being passed the current
     * datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]).
     * The function’s return value is then used to set each element’s inner HTML. A null value will clear the content.
     */
    html(value: ValueFn<GElement, Datum, string | null>): this;

    /**
     * Appends a new element of this type (tag name) as the last child of each selected element,
     * or before the next following sibling in the update selection if this is an enter selection.
     * The latter behavior for enter selections allows you to insert elements into the DOM in an order consistent with the new bound data;
     * however, note that selection.order may still be required if updating elements change order
     * (i.e., if the order of new data is inconsistent with old data).
     *
     * This method returns a new selection containing the appended elements.
     * Each new element inherits the data of the current elements, if any.
     *
     * The generic refers to the type of the child element to be appended.
     *
     * @param type A string representing the tag name. The specified name may have a namespace prefix, such as svg:text
     * to specify a text attribute in the SVG namespace. If no namespace is specified, the namespace will be inherited
     * from the parent element; or, if the name is one of the known prefixes, the corresponding namespace will be used
     * (for example, svg implies svg:svg)
     */
    append<ChildElement extends BaseType>(type: string): Selection<ChildElement, Datum, PElement, PDatum> | any;
    /**
     * Appends a new element of the type provided by the element creator function as the last child of each selected element,
     * or before the next following sibling in the update selection if this is an enter selection.
     * The latter behavior for enter selections allows you to insert elements into the DOM in an order consistent with the new bound data;
     * however, note that selection.order may still be required if updating elements change order
     * (i.e., if the order of new data is inconsistent with old data).
     *
     * This method returns a new selection containing the appended elements.
     * Each new element inherits the data of the current elements, if any.
     *
     * The generic refers to the type of the child element to be appended.
     *
     * @param type A creator function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). This function should return
     * an element to be appended. (The function typically creates a new element, but it may instead return an existing element.)
     */
    append<ChildElement extends BaseType>(type: ValueFn<GElement, Datum, ChildElement>): Selection<ChildElement, Datum, PElement, PDatum>;

    /**
     * Inserts a new element of the specified type (tag name) before the first element matching the specified
     * before selector for each selected element. For example, a before selector :first-child will prepend nodes before the first child.
     * If before is not specified, it defaults to null. (To append elements in an order consistent with bound data, use selection.append.)
     *
     * This method returns a new selection containing the appended elements.
     * Each new element inherits the data of the current elements, if any.
     *
     * The generic refers to the type of the child element to be appended.
     *
     * @param type One of:
     *   * A string representing the tag name for the element type to be inserted. The specified name may have a namespace prefix,
     *     such as svg:text to specify a text attribute in the SVG namespace. If no namespace is specified, the namespace will be inherited
     *     from the parent element; or, if the name is one of the known prefixes, the corresponding namespace will be used
     *     (for example, svg implies svg:svg)
     *   * A creator function which is evaluated for each selected element, in order, being passed the current datum (d),
     *     the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). This function should return
     *     an element to be inserted. (The function typically creates a new element, but it may instead return an existing element.)
     * @param before One of:
     *   * A CSS selector string for the element before which the insertion should occur.
     *   * A child selector function which is evaluated for each selected element, in order, being passed the current datum (d),
     *     the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). This function should return the child element
     *     before which the element should be inserted.
     */
    insert<ChildElement extends BaseType>(
        type: string | ValueFn<GElement, Datum, ChildElement>,
        before?: string | ValueFn<GElement, Datum, BaseType>
        ): Selection<ChildElement, Datum, PElement, PDatum>;

    /**
     * Removes the selected elements from the document.
     * Returns this selection (the removed elements) which are now detached from the DOM.
     */
    remove(): this;

    /**
     * Inserts clones of the selected elements immediately following the selected elements and returns a selection of the newly
     * added clones. If deep is true, the descendant nodes of the selected elements will be cloned as well. Otherwise, only the elements
     * themselves will be cloned.
     *
     * @param deep Perform deep cloning if this flag is set to true.
     */
    clone(deep?: boolean): Selection<GElement, Datum, PElement, PDatum>;

    /**
     * Returns a new selection merging this selection with the specified other selection.
     * The returned selection has the same number of groups and the same parents as this selection.
     * Any missing (null) elements in this selection are filled with the corresponding element,
     * if present (not null), from the specified selection. (If the other selection has additional groups or parents,
     * they are ignored.)
     *
     * This method is commonly used to merge the enter and update selections after a data-join.
     * After modifying the entering and updating elements separately, you can merge the two selections and
     * perform operations on both without duplicate code.
     *
     * This method is not intended for concatenating arbitrary selections, however: if both this selection
     * and the specified other selection have (non-null) elements at the same index, this selection’s element
     * is returned in the merge and the other selection’s element is ignored.
     *
     * @param other Selection to be merged.
     */
    merge(other: Selection<GElement, Datum, PElement, PDatum>): Selection<GElement, Datum, PElement, PDatum>;

    /**
     * Filters the selection, returning a new selection that contains only the elements for
     * which the specified filter is true.
     *
     * The returned filtered selection preserves the parents of this selection, but like array.filter,
     * it does not preserve indexes as some elements may be removed; use selection.select to preserve the index, if needed.
     *
     * @param selector A CSS selector string to match when filtering.
     */
    filter(selector: string): Selection<GElement, Datum, PElement, PDatum>;
    /**
     * Filters the selection, returning a new selection that contains only the elements for
     * which the specified filter is true.
     *
     * The returned filtered selection preserves the parents of this selection, but like array.filter,
     * it does not preserve indexes as some elements may be removed; use selection.select to preserve the index, if needed.
     *
     * The generic refers to the type of element which will be selected after applying the filter, i.e. if the element types
     * contained in a pre-filter selection are narrowed to a subset as part of the filtering.
     *
     * @param selector A CSS selector string to match when filtering.
     */
    filter<FilteredElement extends BaseType>(selector: string): Selection<FilteredElement, Datum, PElement, PDatum>;
    /**
     * Filter the selection, returning a new selection that contains only the elements for
     * which the specified filter is true.
     *
     * The returned filtered selection preserves the parents of this selection, but like array.filter,
     * it does not preserve indexes as some elements may be removed; use selection.select to preserve the index, if needed.
     *
     * @param selector  A value function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). This function should return true
     * for an element to be included, and false otherwise.
     */
    filter(selector: ValueFn<GElement, Datum, boolean>): Selection<GElement, Datum, PElement, PDatum>;
    /**
     * Filter the selection, returning a new selection that contains only the elements for
     * which the specified filter is true.
     *
     * The returned filtered selection preserves the parents of this selection, but like array.filter,
     * it does not preserve indexes as some elements may be removed; use selection.select to preserve the index, if needed.
     *
     * @param selector  A value function which is evaluated for each selected element, in order, being passed the current datum (d),
     * the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]). This function should return true
     * for an element to be included, and false otherwise.
     */
    filter<FilteredElement extends BaseType>(selector: ValueFn<GElement, Datum, boolean>): Selection<FilteredElement, Datum, PElement, PDatum>;

    /**
     * Return a new selection that contains a copy of each group in this selection sorted according
     * to the compare function. After sorting, re-inserts elements to match the resulting order (per selection.order).
     *
     * Note that sorting is not guaranteed to be stable; however, it is guaranteed to have the same
     * behavior as your browser’s built-in sort method on arrays.
     *
     * @param comparator An optional comparator function, which defaults to "ascending". The function is passed
     * two elements’ data a and b to compare. It should return either a negative, positive, or zero value.
     * If negative, then a should be before b; if positive, then a should be after b; otherwise, a and b are
     * considered equal and the order is arbitrary.
     */
    sort(comparator?: (a: Datum, b: Datum) => number): this;

    /**
     * Re-insert elements into the document such that the document order of each group matches the selection order.
     * This is equivalent to calling selection.sort if the data is already sorted, but much faster.
     */
    order(): this;

    /**
     * Re-insert each selected element, in order, as the last child of its parent.
     */
    raise(): this;

    /**
     * Re-insert each selected element, in order, as the first child of its parent.
     */
    lower(): this;

    // Data Join ---------------------------------

    /**
     * Returns the bound datum for the first (non-null) element in the selection.
     * This is generally useful only if you know the selection contains exactly one element.
     */
    datum(): Datum;
    /**
     * Delete the bound data for each element in the selection.
     */
    datum(value: null): Selection<GElement, undefined, PElement, PDatum>;
    /**
     * Sets the element’s bound data using the specified value function on all selected elements.
     * Unlike selection.data, this method does not compute a join and does not affect
     * indexes or the enter and exit selections.
     *
     * The generic refers to the type of the new datum to be used for the selected elements.
     *
     * @param value A value function which is evaluated for each selected element, in order,
     * being passed the current datum (d), the current index (i), and the current group (nodes),
     * with this as the current DOM element (nodes[i]). The function is then used to set each element’s new data.
     * A null value will delete the bound data.
     */
    datum<NewDatum>(value: ValueFn<GElement, Datum, NewDatum>): Selection<GElement, NewDatum, PElement, PDatum>;
    /**
     * Sets the element’s bound data to the specified value on all selected elements.
     * Unlike selection.data, this method does not compute a join and does not affect
     * indexes or the enter and exit selections.
     *
     * The generic refers to the type of the new datum to be used for the selected elements.
     *
     * @param value A value object to be used as the datum for each element.
     */
    datum<NewDatum>(value: NewDatum): Selection<GElement, NewDatum, PElement, PDatum>;

    /**
     * Returns the array of data for the selected elements.
     */
    data(): Datum[];
    /**
     * Joins the specified array of data with the selected elements, returning a new selection that represents
     * the update selection: the elements successfully bound to data. Also defines the enter and exit selections on
     * the returned selection, which can be used to add or remove elements to correspond to the new data.
     *
     * The data is specified for each group in the selection. If the selection has multiple groups
     * (such as d3.selectAll followed by selection.selectAll), then data should typically be specified as a function.
     *
     * If a key function is not specified, then the first datum in data is assigned to the first selected element,
     * the second datum to the second selected element, and so on.
     * A key function may be specified to control which datum is assigned to which element, replacing the default join-by-index,
     * by computing a string identifier for each datum and element.
     *
     * The update and enter selections are returned in data order, while the exit selection preserves the selection
     * order prior to the join. If a key function is specified, the order of elements in the selection may not match
     * their order in the document; use selection.order or selection.sort as needed.
     *
     * This method cannot be used to clear bound data; use selection.datum instead.
     *
     * For details see: {@link https://github.com/d3/d3-selection#joining-data }
     *
     * The generic refers to the type of the new datum to be used for the selected elements.
     *
     * @param data The specified data is an array of arbitrary values (e.g., numbers or objects).
     * @param key An optional key function which is evaluated for each selected element, in order, being passed the
     * current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]); the returned string is the element’s key.
     * The key function is then also evaluated for each new datum in data, being passed the current datum (d),
     * the current index (i), and the group’s new data, with this as the group’s parent DOM element (nodes[i]); the returned string is the datum’s key.
     * The datum for a given key is assigned to the element with the matching key. If multiple elements have the same key,
     * the duplicate elements are put into the exit selection; if multiple data have the same key, the duplicate data are put into the enter selection.
     */
    data<NewDatum>(data: NewDatum[], key?: ValueFn<GElement | PElement, Datum | NewDatum, string>): Selection<GElement, NewDatum, PElement, PDatum>;
    /**
     * Joins the data returned by the specified value function with the selected elements, returning a new selection that it represents
     * the update selection: the elements successfully bound to data. Also defines the enter and exit selections on
     * the returned selection, which can be used to add or remove elements to correspond to the new data.
     *
     * The data is specified for each group in the selection.
     *
     * If a key function is not specified, then the first datum in data is assigned to the first selected element,
     * the second datum to the second selected element, and so on.
     * A key function may be specified to control which datum is assigned to which element, replacing the default join-by-index,
     * by computing a string identifier for each datum and element.
     *
     * The update and enter selections are returned in data order, while the exit selection preserves the selection
     * order prior to the join. If a key function is specified, the order of elements in the selection may not match
     * their order in the document; use selection.order or selection.sort as needed.
     *
     * This method cannot be used to clear bound data; use selection.datum instead.
     *
     * For details see: {@link https://github.com/d3/d3-selection#joining-data }
     *
     * The generic refers to the type of the new datum to be used for the selected elements.
     *
     * @param data A value function which will be evaluated for each group in order, being passed the group’s parent datum
     * (d, which may be undefined), the group index (i), and the selection’s parent nodes (nodes),
     * with this as the group’s parent element. The function returns an array of values for each group.
     * @param key An optional key function which is evaluated for each selected element, in order, being passed the
     * current datum (d), the current index (i), and the current group (nodes), with this as the current DOM element (nodes[i]); the returned string is the element’s key.
     * The key function is then also evaluated for each new datum in data, being passed the current datum (d),
     * the current index (i), and the group’s new data, with this as the group’s parent DOM element (nodes[i]); the returned string is the datum’s key.
     * The datum for a given key is assigned to the element with the matching key. If multiple elements have the same key,
     * the duplicate elements are put into the exit selection; if multiple data have the same key, the duplicate data are put into the enter selection.
     */
    data<NewDatum>(data: ValueFn<PElement, PDatum, NewDatum[]>, key?: ValueFn<GElement | PElement, Datum | NewDatum, string>): Selection<GElement, NewDatum, PElement, PDatum>;

    /**
     * Return the enter selection: placeholder nodes for each datum that had no corresponding DOM element
     * in the selection. (The enter selection is empty for selections not returned by selection.data.)
     */
    enter(): Selection<EnterElement, Datum, PElement, PDatum>;

    /**
     * Returns the exit selection: existing DOM elements in the selection for which no new datum was found.
     * (The exit selection is empty for selections not returned by selection.data.)
     *
     * IMPORTANT: The generic refers to the type of the old datum associated with the exit selection elements.
     * Ensure you set the generic to the correct type, if you need to access the data on the exit selection in
     * follow-up steps, e.g. to set styles as part of an exit transition before removing them.
     */
    exit<OldDatum>(): Selection<GElement, OldDatum, PElement, PDatum>;

    // Event Handling -------------------

    /**
     * Return the currently-assigned listener for the specified event typename on the first (non-null) selected element,
     * if any, If multiple typenames are specified, the first matching listener is returned.
     *
     * @param typenames The typenames is a string event type, such as click, mouseover, or submit; any DOM event type supported by your browser may be used.
     * The type may be optionally followed by a period (.) and a name; the optional name allows multiple callbacks to be registered
     * to receive events of the same type, such as click.foo and click.bar. To specify multiple typenames, separate typenames with spaces,
     * such as "input change"" or "click.foo click.bar".
     */
    on(typenames: string): ValueFn<GElement, Datum, void> | undefined;
    /**
     * Remove a listener for the specified event type names. To remove all listeners for a given name,
     * pass null as the listener and ".foo" as the typename, where foo is the name; to remove all listeners with no name, specify "." as the typename.
     *
     * @param typenames The typenames is a string event type, such as click, mouseover, or submit; any DOM event type supported by your browser may be used.
     * The type may be optionally followed by a period (.) and a name; the optional name allows multiple callbacks to be registered
     * to receive events of the same type, such as click.foo and click.bar. To specify multiple typenames, separate typenames with spaces,
     * such as "input change"" or "click.foo click.bar".
     * @param listener null to indicate removal of listener
     */
    on(typenames: string, listener: null): this;
    /**
     * Add an event listener for the specified event type names. If an event listener was previously registered for the same typename
     * on a selected element, the old listener is removed before the new listener is added.
     *
     * When a specified event is dispatched on a selected node, the specified listener will be evaluated for each selected element.
     *
     * An optional capture flag may be specified which corresponds to the W3C useCapture flag:
     * “After initiating capture, all events of the specified type will be dispatched to the registered EventListener before being
     * dispatched to any EventTargets beneath them in the tree. Events which are bubbling upward through the tree will not
     * trigger an EventListener designated to use capture.”
     *
     * @param typenames The typenames is a string event type, such as click, mouseover, or submit; any DOM event type supported by your browser may be used.
     * The type may be optionally followed by a period (.) and a name; the optional name allows multiple callbacks to be registered
     * to receive events of the same type, such as click.foo and click.bar. To specify multiple typenames, separate typenames with spaces,
     * such as "input change"" or "click.foo click.bar".
     * @param listener A listener function which will be evaluated for each selected element, being passed the current datum (d), the current index (i),
     * and the current group (nodes), with this as the current DOM element (nodes[i]). Listeners always see the latest datum for their element,
     * but the index is a property of the selection and is fixed when the listener is assigned; to update the index, re-assign the listener.
     * To access the current event within a listener, use d3.event.
     * @param capture An optional capture flag which corresponds to the W3C useCapture flag.
     */
    on(typenames: string, listener: ValueFn<GElement, Datum, void>, capture?: boolean): this;

    /**
     * Dispatches a custom event of the specified type to each selected element, in order.
     * An optional parameters map may be specified to set additional properties of the event.
     *
     * @param type Name of event to dispatch
     * @param parameters An optional value map with custom event parameters
     */
    dispatch(type: string, parameters?: CustomEventParameters): this;
    /**
     * Dispatches a custom event of the specified type to each selected element, in order.
     * An optional value function returning a parameters map for each element in the selection may be specified to set additional properties of the event.
     *
     * @param type Name of event to dispatch
     * @param parameters A value function which is evaluated for each selected element, in order,
     * being passed the current datum (d), the current index (i), and the current group (nodes),
     * with this as the current DOM element (nodes[i]). It must return the parameters map for the current element.
     */
    dispatch(type: string, parameters?: ValueFn<GElement, Datum, CustomEventParameters>): this;

    // Control Flow ----------------------

    /**
     * Invoke the specified function for each selected element, passing in the current datum (d),
     * the current index (i), and the current group (nodes), with this of the current DOM element (nodes[i]).
     * This method can be used to invoke arbitrary code for each selected element, and is useful for creating a context to access parent and child data simultaneously.
     *
     * @param func A function which is invoked for each selected element,
     *             being passed the current datum (d), the current index (i), and the current group (nodes), with this of the current DOM element (nodes[i]).
     */
    each(func: ValueFn<GElement, Datum, void>): this;

    /**
     * Invoke the specified function exactly once, passing in this selection along with any optional arguments.
     * Returns this selection.
     *
     * @param func A function which is passed this selection as the first argument along with any optional arguments.
     * @param args List of optional arguments to be passed to the callback function.
     */
    call(func: (selection: Selection<GElement, Datum, PElement, PDatum> | any, ...args: any[]) => void, ...args: any[]): this;

    /**
     * Return true if this selection contains no (non-null) elements.
     */
    empty(): boolean;

    /**
     * Return the first (non-null) element in this selection. If the selection is empty, returns null.
     */
    node(): GElement | null;

    /**
     * Return an array of all (non-null) elements in this selection.
     */
    nodes(): GElement[];

    /**
     * Returns the total number of elements in this selection.
     */
    size(): number;
}
}
