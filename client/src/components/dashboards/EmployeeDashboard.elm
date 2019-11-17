module Components.Dashboards.EmployeeDashboard exposing(..)


import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode exposing (Decoder, field, string)
import Spinner

type Model = 
    Loading { spinner: Spinner.Model } 
    | Success Apps
    | Failure 

type alias Apps = List String

init : () -> (Model, Cmd Msg)
init _ =
    -- (Loading { spinner = Spinner.init }, Cmd.none)
    (Success ["Mile tracker", "Absent Form", "Overtime Form"], Cmd.none)


type Msg
    = Transition Spinner.Msg 
    | LoadApps (Result Http.Error Apps)


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        -- Transition ->
        --   (Loading, Cmd.none) -- TODO: load some data from the server

        LoadApps result ->
            case result of
                Ok appUrls ->
                    (Success appUrls, Cmd.none)

                Err _ ->
                    (Failure, Cmd.none)
        
        Transition spinnerMsg ->
            let
                spinnerModel =
                        Spinner.update spinnerMsg mdl.spinner

                mdl = 
                    case model of 
                        Loading m -> m

                        _ -> { spinner = Spinner.init }


            in
                (Loading { mdl | spinner = spinnerModel }, Cmd.none)


view : Model -> Html Msg
view model =
    case model of 
        Success appUrls -> 
            case appUrls of
                    [] ->
                        div [] 
                            [ p [] [ text "More apps comings soon."] ]

                    urls -> 
                        div [] 
                            [ ul [] <| List.map (\url -> li [] [ text url]) urls ]   

        Loading m -> 
            -- div [] [ p [ text "Loading..."]]
            div [] 
                [ div [] [ Spinner.view Spinner.defaultConfig m.spinner ]
                -- , viewTable { headers = empty, data = empty }
                , viewTable (Table [""] [[""]])
                ]

        Failure ->
            div [] [ p [] [ text "Failed to load apps. Please try reloading the page."]]


empty : List a
empty = []


type Table 
    = Table Columns Rows

type alias Columns = List String

type alias Rows = List (List String)

viewTable : Table -> Html msg
viewTable (Table columns rows) =
    case (columns, rows) of 
        ([], [[]]) -> 
            table [] 
            [ tr []
                [ td [] [] 
                , td [] [] 
                , td [] []
                , td [] []
                ]
            ]
        (cs, [[]]) -> 
            table [] 
            [ tr [] <| List.map (\c -> td [] [text c])  cs ]

        (cs, rs) -> 
            table []
                -- Columns
                [ tr [] <| List.map (viewTableHeader) (cs |> (List.singleton << List.singleton << stringsToHtml << columnsToStrings)) 
                -- Rows
                , tr [] <| List.map viewTableData  (rs |> rowsToStrings) 
                ]
                -- <| List.map2 (\ row col ->  col |> viewTableHeader ) (rowsToStrings rs) ([List.map (stringsToHtml << columnsToStrings) [cs]])

rowsToStrings : Rows -> List String
rowsToStrings rss = 
    List.concat []

columnsToStrings : Columns -> List String 
columnsToStrings cs =
    List.concat []

stringsToHtml : List String -> Html msg
stringsToHtml xs =
    div [] <| List.map (\x -> p [] [text x]) xs

viewTableHeader : List (Html msg) -> Html msg
viewTableHeader =
    th []

viewTableData : String -> Html msg
viewTableData tableData = 
    td [] [ text tableData ]


main = 
    Browser.element 
    { init = init
    , view = view
    , update = update
    , subscriptions = (\model -> Sub.map Transition Spinner.subscription)
    }