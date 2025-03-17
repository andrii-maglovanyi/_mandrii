import { formatDate, formatDistanceToNow } from "date-fns";
import { enUS, uk } from "date-fns/locale";

import { Badge, Column, Row, Table, Tooltip } from "@/components";
import { Dictionary } from "@/dictionaries";
import ShareLocationLink from "@/features/ShareLocationLink/ShareLocationLink";
import { useLanguage, useLocations } from "@/hooks";
import { CONNOTATIONS, Ukrainian_Location_Statuses_Enum } from "@/types";

const MyLocations = () => {
  const { useUserLocations } = useLocations();
  const { data, error, loading } = useUserLocations({});

  const { dict, lang } = useLanguage();

  const COLUMNS = [
    {
      dataIndex: "status",
      key: "status",
      render: (status: unknown) => {
        let connotation = CONNOTATIONS.primary;
        if (status === Ukrainian_Location_Statuses_Enum.Active) {
          connotation = CONNOTATIONS.success;
        } else if (status === Ukrainian_Location_Statuses_Enum.Rejected) {
          connotation = CONNOTATIONS.alert;
        }

        return (
          <Badge
            className="cursor-default"
            connotation={connotation}
            layout={status ? "filled" : "soft"}
          >
            {
              dict[
                String(status ?? "unknown").toLowerCase() as keyof Dictionary
              ]
            }
          </Badge>
        );
      },
      sorter: false,
      title: dict["Status"],
    },
    {
      dataIndex: "name",
      key: "name",
      render: (name: unknown) => <strong>{String(name)}</strong>,
      sorter: false,
      title: dict["Name"],
    },
    {
      dataIndex: "category",
      key: "category",
      render: (category: unknown) => (
        <>
          {dict[
            String(category)
              .toLowerCase()
              .replaceAll("_", " ") as keyof Dictionary
          ] ?? "-"}
        </>
      ),
      sorter: false,
      title: dict["Category"],
    },
    {
      dataIndex: "created_at",
      key: "created_at",
      render: (createdAt: unknown) =>
        typeof createdAt === "string" ? (
          <Tooltip text={formatDate(createdAt, "dd/MM/yyyy HH:mm")}>
            <span style={{ cursor: "default" }}>
              {formatDistanceToNow(createdAt, {
                addSuffix: true,
                locale: lang === "uk" ? uk : enUS,
              })}
            </span>
          </Tooltip>
        ) : (
          "-"
        ),
      sorter: false,
      title: dict["Created"],
    },
  ];

  return (
    <Column>
      <Row className="mb-4 justify-end">
        <ShareLocationLink asButton />
      </Row>
      {error ? (
        error.message
      ) : (
        <Table
          emptyStateHeading={dict["No places added yet"]}
          emptyStateBodyMessage={
            dict[
              "You haven't added any locations yet. Click the button above to add your first location and start managing your places!"
            ]
          }
          columns={COLUMNS}
          dataSource={data}
          loading={loading}
          rowKey="id"
        />
      )}
    </Column>
  );
};

export default MyLocations;
